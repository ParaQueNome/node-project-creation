import { Request, Response } from 'express';
import { createProject } from '../controllers/projectController'; 
import { createNewProject } from '../repositories/projectRepository';
import { checkApiKey } from '../utils/checkApiKey';


jest.mock('../repositories/projectRepository');
jest.mock('../utils/checkApiKey');

describe('createProject Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  let responseJson: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseJson = result;
        return mockResponse;
      }),
    };
    mockNext = jest.fn();
    responseJson = null; 
  });

  it('should return 400 if request body is missing', async () => {
    mockRequest.body = undefined;
    (checkApiKey as jest.Mock).mockReturnValue(true); 

    await createProject(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseJson).toEqual({ error: 'Bad Request: Request Body required' });
  });

    it('should return 403 if API key is invalid', async () => {
    mockRequest.query = { api_key: 'wrong_key' };
    (checkApiKey as jest.Mock).mockImplementation((req, res) => {
        res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
        return false;
    });

    await createProject(mockRequest as Request, mockResponse as Response);

    expect(checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(responseJson).toEqual({ error: 'Forbidden: API_KEY is missing or invalid' });
    });

  it('should call createNewProject and return 200 with the created project data', async () => {
    const projectData = { title: 'Test Project', description: 'Test Description', thumbnail: 'test.jpg', url: 'http://example.com' };
    mockRequest.body = projectData;
    (checkApiKey as jest.Mock).mockReturnValue(true);
    (createNewProject as jest.Mock).mockResolvedValue(projectData); 

    await createProject(mockRequest as Request, mockResponse as Response);

    expect(createNewProject).toHaveBeenCalledWith(projectData);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseJson).toEqual(projectData);
  });

  it('should handle errors and return 500', async () => {
    mockRequest.body = { title: 'Test Project' };
    (checkApiKey as jest.Mock).mockReturnValue(true);
    (createNewProject as jest.Mock).mockRejectedValue(new Error('Database error')); 
    await createProject(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseJson.error).toContain('Internal server error, try it later');
  });
});