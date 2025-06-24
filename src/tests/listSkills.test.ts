import { Request, Response } from 'express';
import { listAllSkills } from '../controllers/skillsController'; 
import { listSkills } from '../repositories/skillsRepository';
import dotenv from 'dotenv';
import pool from '../database/database';
dotenv.config({ path: '.env.local' });

jest.mock('../repositories/skillsRepository');  
jest.mock('dotenv'); 

describe('listAllSkills', () => {
    let mockRequest: Partial<Request>;  
    let mockResponse: Partial<Response>;  
    let mockJson: jest.Mock;  
    let mockStatus: jest.Mock;  

    beforeEach(() => {
        mockJson = jest.fn();  
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });  

        mockRequest = {
            query: {},  
        };

        mockResponse = {
            status: mockStatus, 
            json: mockJson,  
        };

        jest.clearAllMocks();  
    });

    afterAll(async () => {
        await pool.end();  
    });

    it('should return 403 if API_KEY is missing', async () => {
        await listAllSkills(mockRequest as Request, mockResponse as Response);

        expect(mockStatus).toHaveBeenCalledWith(403);  
        expect(mockJson).toHaveBeenCalledWith({ error: 'Forbidden: API_KEY is missing or invalid' });  
    });

    it('should return 403 if API_KEY is invalid', async () => {
        mockRequest.query = { api_key: 'wrong_key' };  
        await listAllSkills(mockRequest as Request, mockResponse as Response);

        expect(mockStatus).toHaveBeenCalledWith(403);  
        expect(mockJson).toHaveBeenCalledWith({ error: 'Forbidden: API_KEY is missing or invalid' });  
    });

    it('should return 200 with skills if API_KEY is valid', async () => {
        const mockSkills = [{ name: 'JavaScript' }, { name: 'TypeScript' }];
        (listSkills as jest.Mock).mockResolvedValue(mockSkills);  

        process.env.API_KEY_NODE = 'valid_api_key';  
        mockRequest.query = { api_key: 'valid_api_key' }; 

        await listAllSkills(mockRequest as Request, mockResponse as Response);

        expect(mockStatus).toHaveBeenCalledWith(200);  
        expect(mockJson).toHaveBeenCalledWith(mockSkills);  
        expect(listSkills).toHaveBeenCalledTimes(1);  
    });

    it('should return 500 if listSkills throws an error', async () => {
        (listSkills as jest.Mock).mockRejectedValue(new Error('Database error'));  

        process.env.API_KEY_NODE = 'valid_api_key';  
        mockRequest.query = { api_key: 'valid_api_key' };  

        await listAllSkills(mockRequest as Request, mockResponse as Response);

        expect(mockStatus).toHaveBeenCalledWith(500);  
        expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error, try it later: Error: Database error' }); 
    });
});