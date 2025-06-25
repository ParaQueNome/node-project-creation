import { Request, Response } from 'express';
import { deleteSkill } from '../controllers/skillsController'; 
import * as skillsRepository from '../repositories/skillsRepository'; 
import * as checkApiKeyModule from '../utils/checkApiKey'; 
import * as checkProjectIdModule from '../utils/checkId'; 

jest.mock('../repositories/skillsRepository');
jest.mock('../utils/checkApiKey');
jest.mock('../utils/checkProjectId');

describe('deleteSkill Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseJson: jest.Mock;
    let checkApiKeyMock: jest.SpyInstance;
    let checkProjectIdMock: jest.SpyInstance;
    let deleteSkillByIdMock: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        responseJson = mockResponse.json as jest.Mock;

        checkApiKeyMock = jest.spyOn(checkApiKeyModule, 'checkApiKey');
        checkProjectIdMock = jest.spyOn(checkProjectIdModule, 'default');
        deleteSkillByIdMock = skillsRepository.deleteSkillById as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 403 if apiKey is invalid', async () => {
        mockRequest.query = { id: '1', api_key: 'wrong_key' }; 
        checkApiKeyMock.mockImplementation((req: Request, res: Response) => { 
            res.status(403).json({ message: 'Invalid API Key' });
            return false;
        });

        await deleteSkill(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(responseJson).toHaveBeenCalledWith({ message: 'Invalid API Key' });
        expect(deleteSkillByIdMock).not.toHaveBeenCalled();
    });

    it('should delete a skill and return 200 with the deleted skill data', async () => {
        const skillId = 1;
        const mockDeletedSkill = { id: skillId, title: 'JavaScript', rate: 5 };
        mockRequest.query = { id: String(skillId) }; 
        checkApiKeyMock.mockReturnValue(true);
        checkProjectIdMock.mockReturnValue(true);
        deleteSkillByIdMock.mockResolvedValue(mockDeletedSkill);

        await deleteSkill(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseJson).toHaveBeenCalledWith(mockDeletedSkill);
        expect(deleteSkillByIdMock).toHaveBeenCalledWith(skillId);
    });

    it('should return 404 if the skill does not exist', async () => {
        const skillId = 999;
        mockRequest.query = { id: String(skillId) }; 
        checkApiKeyMock.mockReturnValue(true);
        checkProjectIdMock.mockReturnValue(true);
        deleteSkillByIdMock.mockResolvedValue(null); 

        await deleteSkill(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(responseJson).toHaveBeenCalledWith({ error: "The skill you're trying to delete doesn't exists" });
        expect(deleteSkillByIdMock).toHaveBeenCalledWith(skillId);
    });

    it('should handle errors and return 500', async () => {
        const skillId = 1;
        mockRequest.query = { id: String(skillId) };
        checkApiKeyMock.mockReturnValue(true);
        checkProjectIdMock.mockReturnValue(true);
        deleteSkillByIdMock.mockRejectedValue(new Error('Database error'));

        await deleteSkill(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseJson).toHaveBeenCalledWith({ error: `Internal server error, try it later: Error: Database error` });
        expect(deleteSkillByIdMock).toHaveBeenCalledWith(skillId);
    });
});