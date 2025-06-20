import { Request, Response } from 'express';
import { updateProject } from '../controllers/projectController';
import * as apiKeyModule from  '../utils/checkApiKey'; 
import * as projectService from '../repositories/projectRepository';

jest.mock('../utils/checkApiKey');
jest.mock('../repositories/projectRepository');


const mockRequest = () => {
  const req = {} as Request;
  req.query = {};
  req.body = {};
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('updateProject Controller', () => {
  let req: Request;
  let res: Response;
  
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks(); 
  });

  test('should return early if API key validation fails', async () => {
  
  (apiKeyModule.checkApiKey as jest.Mock).mockImplementation((req, res) => {
    res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
    return false;
  });
  
  await updateProject(req, res);
  

  expect(apiKeyModule.checkApiKey).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.json).toHaveBeenCalledWith({
    error: 'Forbidden: API_KEY is missing or invalid'
  });
});

  test('should return 400 if projectId is missing', async () => {
    
    (apiKeyModule.checkApiKey as jest.Mock).mockReturnValueOnce(true);
    
    
    req.query = {};
    
    await updateProject(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bad Request: projectId expected"
    });
  });

  test('should return 400 if request body is missing', async () => {
    
    (apiKeyModule.checkApiKey as jest.Mock).mockReturnValueOnce(true);
    
    
    req.query.id = "1";
    req.body = undefined;
    
    await updateProject(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Bad Request: Request Body required'
    });
  });

  test('should return 404 if project does not exist', async () => {
    
    (apiKeyModule.checkApiKey as jest.Mock).mockReturnValueOnce(true);
    
    
    req.query.id = "1";
    req.body = { name: "Updated Project" };
    
    
    (projectService.updateProjectById as jest.Mock).mockResolvedValueOnce(null);
    
    await updateProject(req, res);
    
    expect(projectService.updateProjectById).toHaveBeenCalledWith(
      { id: 1 },
      { name: "Updated Project" }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "The project you're trying to update doesn't exists"
    });
  });

  test('should return 200 with updated project data on success', async () => {
   
    (apiKeyModule.checkApiKey as jest.Mock).mockReturnValueOnce(true);
    
    
    req.query.id = "1";
    req.body = { name: "Updated Project" };
    
    
    const mockUpdatedProject = { id: 1, name: "Updated Project" };
    (projectService.updateProjectById as jest.Mock).mockResolvedValueOnce(mockUpdatedProject);
    
    await updateProject(req, res);
    
    expect(projectService.updateProjectById).toHaveBeenCalledWith(
      { id: 1 },
      { name: "Updated Project" }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedProject);
  });

  test('should return 500 if an error occurs during processing', async () => {
    
    (apiKeyModule.checkApiKey as jest.Mock).mockReturnValueOnce(true);
    
   
    req.query.id = "1";
    req.body = { name: "Updated Project" };
    
  
    const errorMessage = "Database connection failed";
    (projectService.updateProjectById as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
    await updateProject(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining(errorMessage)
    }));
  });
});