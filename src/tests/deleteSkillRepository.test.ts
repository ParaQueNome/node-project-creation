import { QueryResult } from 'pg';
import { deleteSkillById } from '../repositories/skillsRepository';
import pool from '../database/database';

jest.mock('../database/database');

describe('deleteSkillById', () => {
    let mockQuery: jest.Mock;

    beforeEach(() => {
        mockQuery = (pool.query as jest.Mock);
        jest.clearAllMocks();
    });

    it('should delete a skill by ID and return the deleted skill', async () => {
        const skillId = 1;
        const mockSkill = { id: skillId, title: 'JavaScript', rate: 5 };

        mockQuery.mockResolvedValue({ rows: [mockSkill] } as QueryResult);

        const result = await deleteSkillById(skillId);

        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM skills WHERE id = $1 RETURNING *',
            [skillId]
        );
        expect(result).toEqual(mockSkill);
    });

    it('should return null if the skill does not exist', async () => {
        const skillId = 999;
        mockQuery.mockResolvedValue({ rows: [] } as unknown as QueryResult);

        const result = await deleteSkillById(skillId);

        expect(result).toBeNull();
        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM skills WHERE id = $1 RETURNING *',
            [skillId]
        );
    });

    it('should handle database errors', async () => {
        const skillId = 1;
        mockQuery.mockRejectedValue(new Error('Database error'));

        await expect(deleteSkillById(skillId)).rejects.toThrow('Database error');
        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM skills WHERE id = $1 RETURNING *',
            [skillId]
        );
    });
});