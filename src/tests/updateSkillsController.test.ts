import { Request, Response } from 'express';
import { updateSkill } from '../controllers/skillsController';
import * as skillsRepository from '../repositories/skillsRepository';
import * as checkApiKeyModule from '../utils/checkApiKey';
import * as checkIdModule from '../utils/checkId';
import * as checkBodyRequestModule from '../utils/checkBodyRequest';


jest.mock('../repositories/skillsRepository', () => ({
  updateSkillById: jest.fn(),
}));

jest.mock('../utils/checkApiKey', () => ({
  checkApiKey: jest.fn(),
}));

jest.mock('../utils/checkId', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../utils/checkBodyRequest', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('updateSkill Controller', () => {
 
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    
    jest.clearAllMocks();

    
    jsonMock = jest.fn().mockReturnThis();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

  
    (checkApiKeyModule.checkApiKey as jest.Mock).mockReturnValue(true);
    (checkIdModule.default as jest.Mock).mockReturnValue(true);
    (checkBodyRequestModule.default as jest.Mock).mockReturnValue(true);
  });

    test('it should update an skill successfull', async () => {
 
    const skillId = 1;
    const skillData = { name: 'JavaScript', level: 'Expert' };
    const updatedSkill = { id: skillId, ...skillData };
    
    mockRequest = {
      query: { id: skillId.toString() },
      body: skillData
    };

    (skillsRepository.updateSkillById as jest.Mock).mockResolvedValue(updatedSkill);

    
    await updateSkill(mockRequest as Request, mockResponse as Response);

    expect(checkApiKeyModule.checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
    expect(checkIdModule.default).toHaveBeenCalledWith(skillId, mockRequest, mockResponse);
    expect(checkBodyRequestModule.default).toHaveBeenCalledWith(skillData, mockRequest, mockResponse);
    expect(skillsRepository.updateSkillById).toHaveBeenCalledWith({ id: skillId }, skillData);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(updatedSkill);
  });

  test('it should return 404 when skill does not exist', async () => {
    
    const skillId = 999;
    const skillData = { name: 'Python', level: 'Beginner' };
    
    mockRequest = {
      query: { id: skillId.toString() },
      body: skillData
    };

    (skillsRepository.updateSkillById as jest.Mock).mockResolvedValue(null);

    
    await updateSkill(mockRequest as Request, mockResponse as Response);

    expect(skillsRepository.updateSkillById).toHaveBeenCalledWith({ id: skillId }, skillData);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "The skill you're trying to update doesn't exists"
    });
  });

  test('it should return 500 when requisition failed', async () => {
   
    const skillId = 1;
    const skillData = { name: 'React', level: 'Intermediate' };
    const error = new Error('Database error');
    
    mockRequest = {
      query: { id: skillId.toString() },
      body: skillData
    };

    (skillsRepository.updateSkillById as jest.Mock).mockRejectedValue(error);

    
    await updateSkill(mockRequest as Request, mockResponse as Response);

   
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: `Internal server error, try it later: ${error}`
    });
  });

  test('it should return invalid api key ', async () => {
    
    mockRequest = {
      query: { id: '1' },
      body: { name: 'TypeScript' }
    };

    (checkApiKeyModule.checkApiKey as jest.Mock).mockReturnValue(false);

    
    await updateSkill(mockRequest as Request, mockResponse as Response);

  
    expect(checkApiKeyModule.checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
    expect(skillsRepository.updateSkillById).not.toHaveBeenCalled();
  });

  test('it should return invalid skill id', async () => {
    
    mockRequest = {
      query: { id: 'abc' }, 
      body: { name: 'CSS' }
    };

    (checkIdModule.default as jest.Mock).mockReturnValue(false);

  
    await updateSkill(mockRequest as Request, mockResponse as Response);

   
    expect(checkApiKeyModule.checkApiKey).toHaveBeenCalled();
    expect(checkIdModule.default).toHaveBeenCalled();
    expect(skillsRepository.updateSkillById).not.toHaveBeenCalled();
  });

  test('it should return invalid body requisition', async () => {
  
    mockRequest = {
      query: { id: '1' },
      body: {} 
    };

    (checkBodyRequestModule.default as jest.Mock).mockReturnValue(false);

    
    await updateSkill(mockRequest as Request, mockResponse as Response);

  
    expect(checkApiKeyModule.checkApiKey).toHaveBeenCalled();
    expect(checkIdModule.default).toHaveBeenCalled();
    expect(checkBodyRequestModule.default).toHaveBeenCalled();
    expect(skillsRepository.updateSkillById).not.toHaveBeenCalled();
  });
});