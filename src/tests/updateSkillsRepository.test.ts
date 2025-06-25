import pool from '../database/database';
import { updateSkillById } from '../repositories/skillsRepository'
import SkillData from '../utils/skillsInterface';


jest.mock('../database/database', () => ({
  query: jest.fn(),
}));

describe('updateSkillById', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should update a skill successful', async () => {
   
    const skillId = { id: 1 };
    const skillData: SkillData = { title: 'JavaScript', rate: 10 };
    const mockResult = {
      rows: [{ id: 1, title: 'JavaScript', rate: 10 }],
    };
    
   
    (pool.query as jest.Mock).mockResolvedValueOnce(mockResult);

    
    const result = await updateSkillById(skillId, skillData);

  
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE skills SET'),
      expect.arrayContaining([skillData.title, skillData.rate, skillId.id])
    );
    expect(result).toEqual(mockResult.rows[0]);
  });

  test('it should return null when skill does not exist', async () => {
    
    const skillId = { id: 999 };
    const skillData: SkillData = { title: 'Python', rate: 10 };
    const mockResult = { rows: [] };
    
    (pool.query as jest.Mock).mockResolvedValueOnce(mockResult);


    const result = await updateSkillById(skillId, skillData);

 
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test('it should throw an error when failed to fetch data', async () => {
 
    const skillId = { id: 1 };
    const skillData: SkillData = { title: 'React', rate: 5 };
    const mockError = new Error('Connection error, try it later');
    
    (pool.query as jest.Mock).mockRejectedValueOnce(mockError);


    await expect(updateSkillById(skillId, skillData)).rejects.toThrow(mockError);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});