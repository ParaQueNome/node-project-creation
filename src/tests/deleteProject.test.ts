import { Request, Response } from 'express';
import { deleteProject } from '../controllers/projectController'; 
import * as projectRepository from '../repositories/projectRepository'; 
import * as checkApiKeyModule from '../utils/checkApiKey';


jest.mock('../repositories/projectRepository');
jest.mock('../utils/checkApiKey');

describe('deleteProject Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;
    let responseJson: jest.Mock;
    let checkApiKeyMock: jest.SpyInstance;
    let deleteProjectByIdMock: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
        responseJson = mockResponse.json as jest.Mock;

        checkApiKeyMock = jest.spyOn(checkApiKeyModule, 'checkApiKey');
        deleteProjectByIdMock = projectRepository.deleteProjectById as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if projectId is missing', async () => {
        mockRequest.query = {}; // Sem projectId
        checkApiKeyMock.mockReturnValue(true);

        await deleteProject(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ error: "Bad Request: projectId expected" });
        expect(deleteProjectByIdMock).not.toHaveBeenCalled(); 
    });

    it('should return 403 if apiKey is invalid', async () => {
        mockRequest.query = { id: '1', api_key: 'wrong_key' }; 
        checkApiKeyMock.mockImplementation((req: Request, res: Response) => { 
        res.status(403).json({ message: 'Invalid API Key' });
        return false;
        });

        await deleteProject(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(responseJson).toHaveBeenCalledWith({ message: 'Invalid API Key' });
        expect(deleteProjectByIdMock).not.toHaveBeenCalled();
    });

    it('should delete a project and return 200 with the deleted project data', async () => {
        const projectId = 1;
        const mockDeletedProject = { id: projectId, name: 'Deleted Project' };
        mockRequest.query = { id: String(projectId) }; 
        checkApiKeyMock.mockReturnValue(true);
        deleteProjectByIdMock.mockResolvedValue(mockDeletedProject);

        await deleteProject(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseJson).toHaveBeenCalledWith(mockDeletedProject);
        expect(deleteProjectByIdMock).toHaveBeenCalledWith(projectId);
    });

    it('should handle errors and return 500', async () => {
        const projectId = 1;
        mockRequest.query = { id: String(projectId) };
        checkApiKeyMock.mockReturnValue(true);
        deleteProjectByIdMock.mockRejectedValue(new Error('Database error'));

        await deleteProject(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseJson).toHaveBeenCalledWith({ error: `Internal server error, try it later: Error: Database error` });
        expect(deleteProjectByIdMock).toHaveBeenCalledWith(projectId);
    });
});