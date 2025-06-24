import { addNewSkill } from '../repositories/skillsRepository';
import pool from '../database/database';
import skillsSchema from '../models/skills';
import { QueryResult } from 'pg';
import SkillData from '../utils/skillsInterface';

jest.mock('../database/database', () => {
  return {
    query: jest.fn(),
  };
});

jest.mock('../models/skills', () => jest.fn());

describe('Skills Repository', () => {
  
  const mockSkillData: SkillData = {
    title: 'JavaScript',
    rate: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (skillsSchema as jest.Mock).mockReturnValue(mockSkillData);
  });

  test('should successfully insert a new skill into the database', async () => {
    
    const mockQueryResult = { rows: [mockSkillData] } as QueryResult;
    
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await addNewSkill(mockSkillData);

    expect(skillsSchema).toHaveBeenCalledWith(mockSkillData);

    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *',
      [
        mockSkillData.title,
        mockSkillData.rate,
      ]
    );

    expect(result).toEqual(mockSkillData);
  });

  test('should throw an error if the database insertion fails', async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(addNewSkill(mockSkillData)).rejects.toThrow('Database error');
  });

  test('should use the correct SQL query format', async () => {
    const mockQueryResult = { rows: [mockSkillData] } as QueryResult;
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);
    
    await addNewSkill(mockSkillData);
    
    const sqlQuery = (pool.query as jest.Mock).mock.calls[0][0];
    expect(sqlQuery).toBe('INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *');
  });
});