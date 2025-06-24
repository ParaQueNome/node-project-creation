import { listSkills } from '../repositories/skillsRepository';
import pool from '../database/database';
import skillsSchema from '../models/skills';

jest.mock('../database/database');  
jest.mock('../models/skills');  

describe('listSkills', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });
  
  afterAll(async () => {
    await pool.end(); 
  });

  it('should return an array of skills when the query is successful', async () => {
    const mockRows = [
      { id: 1, title: 'JavaScript', rate: 5 },
      { id: 2, title: 'TypeScript', rate: 4 },
    ];
    const mockQueryResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);  
    (skillsSchema as jest.Mock).mockImplementation((row) => ({
      id: row.id,
      title: row.title,
      rate: row.rate,
    }));  

    const skills = await listSkills();  

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM skills');  
    expect(skills).toEqual([
      { id: 1, title: 'JavaScript', rate: 5 },
      { id: 2, title: 'TypeScript', rate: 4 },
    ]);  
    expect(skillsSchema).toHaveBeenCalledTimes(mockRows.length);  
  });

  it('should throw an error if the query fails', async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));  

    await expect(listSkills()).rejects.toThrow('Database error');  
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM skills');  
  });
});