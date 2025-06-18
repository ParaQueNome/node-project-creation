"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectController_1 = require("../controllers/projectController");
const projectRepository_1 = require("../repositories/projectRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
jest.mock('../repositories/projectRepository');
jest.mock('../utils/checkApiKey');
describe('createProject Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let responseJson;
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
    it('should return 400 if request body is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = undefined;
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        yield (0, projectController_1.createProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseJson).toEqual({ error: 'Bad Request: Request Body required' });
    }));
    it('should return 403 if API key is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.query = { api_key: 'wrong_key' };
        checkApiKey_1.checkApiKey.mockImplementation((req, res) => {
            res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
            return false;
        });
        yield (0, projectController_1.createProject)(mockRequest, mockResponse);
        expect(checkApiKey_1.checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(responseJson).toEqual({ error: 'Forbidden: API_KEY is missing or invalid' });
    }));
    it('should call createNewProject and return 200 with the created project data', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectData = { title: 'Test Project', description: 'Test Description', thumbnail: 'test.jpg', url: 'http://example.com' };
        mockRequest.body = projectData;
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        projectRepository_1.createNewProject.mockResolvedValue(projectData);
        yield (0, projectController_1.createProject)(mockRequest, mockResponse);
        expect(projectRepository_1.createNewProject).toHaveBeenCalledWith(projectData);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseJson).toEqual(projectData);
    }));
    it('should handle errors and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.body = { title: 'Test Project' };
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        projectRepository_1.createNewProject.mockRejectedValue(new Error('Database error'));
        yield (0, projectController_1.createProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseJson.error).toContain('Internal server error, try it later');
    }));
});
//# sourceMappingURL=createProject.test.js.map