import { updateProjectById } from '../repositories/projectRepository';
import { QueryResult } from 'pg';
import ProjectData from '../utils/projectInterface';

const mockQuery = jest.fn();

jest.mock('../database/database', () => ({
  pool: {
    query: mockQuery,
  },
}));

describe('updateProjectById', () => {
  const projectId = { id: 1 };
  const projectData: ProjectData = {
    title: 'New Title',
    description: 'New Description',
    thumbnail: 'new-thumbnail.png',
    url: 'https://new-url.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an updated project when the update is successful', async () => {
    const updatedProject = { id: 1, ...projectData };
    mockQuery.mockResolvedValueOnce({ rows: [updatedProject] } as QueryResult);
    const result = await updateProjectById(projectId, projectData);

    expect(result).toEqual(updatedProject);
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *',
      [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]
    );
  });

  it('should return null when the project is not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] } as unknown as QueryResult);
    const result = await updateProjectById(projectId, projectData);

    expect(result).toBeNull();
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *',
      [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]
    );
  });

  it('should throw an error if there is an error during the query', async () => {
    const errorMessage = 'Database error';
    mockQuery.mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(updateProjectById(projectId, projectData)).rejects.toThrow(errorMessage);
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *',
      [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]
    );
  });
});