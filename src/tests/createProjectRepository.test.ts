// createProjectRepository.test.ts

import { createNewProject } from '../repositories/projectRepository';
import pool from '../database/database';
import projectSchema from '../models/projects';
import { QueryResult } from 'pg';
import ProjectData  from '../utils/projectInterface';

// Important: The proper way to mock the pool object
jest.mock('../database/database', () => {
  return {
    query: jest.fn(),
  };
});

jest.mock('../models/projects', () => jest.fn());

describe('Project Repository', () => {
  // Define mock data
  const mockProjectData: ProjectData = {
    title: 'Test Project',
    description: 'This is a test project',
    thumbnail: 'http://example.com/image.jpg',
    url: 'http://example.com',
  };

  // Before each test, reset mocks
  beforeEach(() => {
    jest.clearAllMocks();
    (projectSchema as jest.Mock).mockReturnValue(mockProjectData);
  });

  test('should successfully insert a new project into the database', async () => {
    // Set up mock return value for database query
    const mockQueryResult = { rows: [mockProjectData] } as QueryResult;
    
    // This is the correct way to mock the pool.query function
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await createNewProject(mockProjectData);

    // Verify projectSchema was called with correct data
    expect(projectSchema).toHaveBeenCalledWith(mockProjectData);

    // Verify SQL query was executed with correct parameters
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        mockProjectData.title,
        mockProjectData.description,
        mockProjectData.thumbnail,
        mockProjectData.url,
      ]
    );

    // Verify function returned expected result
    expect(result).toEqual(mockProjectData);
  });

  test('should throw an error if the database insertion fails', async () => {
    const mockProjectData: ProjectData = {
      title: 'Test Project',
      description: 'This is a test project',
      thumbnail: 'http://example.com/image.jpg',
      url: 'http://example.com',
    };
    
    // Mock a rejection for pool.query
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createNewProject(mockProjectData)).rejects.toThrow('Database insertion failed.');
  });

  test('should throw an error if schema validation fails', async () => {
    // Mock schema validation to throw an error
    const validationError = new Error('Validation failed');
    (projectSchema as jest.Mock).mockImplementation(() => {
      throw validationError;
    });

    // Spy on console.error to verify it's called with the correct error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(createNewProject(mockProjectData)).rejects.toThrow('Database insertion failed.');
    
    // Verify error was logged correctly
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting into database:', validationError);
    
    // Restore the original console.error function
    consoleErrorSpy.mockRestore();
  });

  test('should use the correct SQL query format', async () => {
    // Mock successful query response
    const mockQueryResult = { rows: [mockProjectData] } as QueryResult;
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);
    
    await createNewProject(mockProjectData);
    
    // Check that the first argument to the first call of pool.query is the expected SQL query
    const sqlQuery = (pool.query as jest.Mock).mock.calls[0][0];
    expect(sqlQuery).toBe('INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *');
  });
});