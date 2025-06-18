
import { createNewProject } from '../repositories/projectRepository';
import pool from '../database/database';
import projectSchema from '../models/projects';
import { QueryResult } from 'pg';
import ProjectData  from '../utils/projectInterface';


jest.mock('../database/database', () => {
  return {
    query: jest.fn(),
  };
});

jest.mock('../models/projects', () => jest.fn());

describe('Project Repository', () => {
  
  const mockProjectData: ProjectData = {
    title: 'Test Project',
    description: 'This is a test project',
    thumbnail: 'http://example.com/image.jpg',
    url: 'http://example.com',
  };


  beforeEach(() => {
    jest.clearAllMocks();
    (projectSchema as jest.Mock).mockReturnValue(mockProjectData);
  });

  test('should successfully insert a new project into the database', async () => {
    
    const mockQueryResult = { rows: [mockProjectData] } as QueryResult;
    
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await createNewProject(mockProjectData);

    expect(projectSchema).toHaveBeenCalledWith(mockProjectData);

  
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        mockProjectData.title,
        mockProjectData.description,
        mockProjectData.thumbnail,
        mockProjectData.url,
      ]
    );

   
    expect(result).toEqual(mockProjectData);
  });

  test('should throw an error if the database insertion fails', async () => {
    const mockProjectData: ProjectData = {
      title: 'Test Project',
      description: 'This is a test project',
      thumbnail: 'http://example.com/image.jpg',
      url: 'http://example.com',
    };
    
   
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createNewProject(mockProjectData)).rejects.toThrow('Database error');
  });


  test('should use the correct SQL query format', async () => {
    const mockQueryResult = { rows: [mockProjectData] } as QueryResult;
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);
    
    await createNewProject(mockProjectData);
    
    
    const sqlQuery = (pool.query as jest.Mock).mock.calls[0][0];
    expect(sqlQuery).toBe('INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *');
  });
});