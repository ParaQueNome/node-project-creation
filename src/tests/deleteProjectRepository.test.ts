import { QueryResult } from 'pg';
import { deleteProjectById } from '../repositories/projectRepository';
import pool from '../database/database';


jest.mock('../database/database', () => ({
    query: jest.fn()
}));

describe('deleteProjectById', () => {
    let mockQuery: jest.Mock;

    beforeEach(() => {
        mockQuery = pool.query as jest.Mock;
    });

    afterEach(() => {
        mockQuery.mockClear();
    });

    it('should delete a project by ID and return the deleted project', async () => {
        const projectId = 1;
        const mockProject = { id: projectId, name: 'Test Project' };

        mockQuery.mockResolvedValue({ rows: [mockProject] } as QueryResult);

        const result = await deleteProjectById(projectId);

        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [projectId]
        );
        expect(result).toEqual(mockProject);
    });

    it('should throw an error if the project does not exist', async () => {
        const projectId = 999;
        mockQuery.mockResolvedValue({ rows: [] } as unknown as QueryResult);

        await expect(deleteProjectById(projectId)).rejects.toThrow(
            "The project you're trying to delete doesn't exists"
        );
        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [projectId]
        );
    });

    it('should handle database errors', async () => {
        const projectId = 1;
        mockQuery.mockRejectedValue(new Error('Database error'));

        await expect(deleteProjectById(projectId)).rejects.toThrow('Database error');
        expect(mockQuery).toHaveBeenCalledWith(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [projectId]
        );
    });
});