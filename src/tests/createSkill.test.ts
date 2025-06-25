import { Request, Response } from 'express';
import { createSkill } from '../controllers/skillsController'; 
import { createNewSkill } from '../repositories/skillsRepository';
import { checkApiKey } from '../utils/checkApiKey';
import checkBodyRequest from '../utils/checkBodyRequest';

jest.mock('../repositories/skillsRepository');
jest.mock('../utils/checkApiKey');
jest.mock('../utils/checkBodyRequest');

describe('createSkill Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
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
    responseJson = null; 
  });

  it('should return 400 if rate is out of bounds', async () => {
    const skillData = { title: 'JavaScript', rate: 0 };
    mockRequest.body = skillData;

    (checkApiKey as jest.Mock).mockReturnValue(true);
    (checkBodyRequest as jest.Mock).mockReturnValue(true);

    await createSkill(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseJson).toEqual({ error: 'Bad request: rate must be a number between 1-10' });
  });

  it('should return 403 if API key is invalid', async () => {
    mockRequest.query = { api_key: 'wrong_key' };
    (checkApiKey as jest.Mock).mockImplementation((req, res) => {
      res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
      return false;
    });

    await createSkill(mockRequest as Request, mockResponse as Response);

    expect(checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(responseJson).toEqual({ error: 'Forbidden: API_KEY is missing or invalid' });
  });


  it('should call addNewSkill and return 200 with the created skill data', async () => {
    const skillData = { title: 'JavaScript', rate: 5 };
    mockRequest.body = skillData;

    (checkApiKey as jest.Mock).mockReturnValue(true);
    (checkBodyRequest as jest.Mock).mockReturnValue(true);
    (createNewSkill as jest.Mock).mockResolvedValue(skillData);

    await createSkill(mockRequest as Request, mockResponse as Response);

    expect(createNewSkill).toHaveBeenCalledWith(skillData);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseJson).toEqual(skillData);
  });

  it('should handle errors and return 500', async () => {
    const skillData = { title: 'JavaScript', rate: 5 };
    mockRequest.body = skillData;

    (checkApiKey as jest.Mock).mockReturnValue(true);
    (checkBodyRequest as jest.Mock).mockReturnValue(true);
    (createNewSkill as jest.Mock).mockRejectedValue(new Error('Database error'));

    await createSkill(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseJson.error).toContain('Internal server error, try it later');
  });
});