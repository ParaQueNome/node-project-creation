import listProjects from '../repositories/projectRepository';
import pool from '../database/database';
import projectSchema from '../models/projects';

jest.mock('../database/database');
jest.mock('../models/projects'); 

describe('listProjects', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });
  afterAll(async () => {
    await pool.end(); 
  });


  it('should return an array of projects when the query is successful', async () => {
    
    const mockRows = [
      { id: 1, name: 'Project 1', description: 'Description 1' },
      { id: 2, name: 'Project 2', description: 'Description 2' },
    ];
    const mockQueryResult = { rows: mockRows };

    
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

   
    (projectSchema as jest.Mock).mockImplementation((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
    }));

    const projects = await listProjects();

    
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projects'); 
    expect(projects).toEqual([
      { id: 1, name: 'Project 1', description: 'Description 1' },
      { id: 2, name: 'Project 2', description: 'Description 2' },
    ]); 
    expect(projectSchema).toHaveBeenCalledTimes(mockRows.length); 
  });

  it('should throw an error if the query fails', async () => {
    
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    
    await expect(listProjects()).rejects.toThrow('Database error');
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projects'); 
  });
});