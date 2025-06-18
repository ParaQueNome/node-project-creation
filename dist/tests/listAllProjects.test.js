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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectController_1 = require("../controllers/projectController");
const projectRepository_1 = require("../repositories/projectRepository");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database/database"));
dotenv_1.default.config({ path: '.env.local' });
jest.mock('../repositories/projectRepository');
jest.mock('dotenv');
describe('listAllProjects', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;
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
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.end();
    }));
    it('should return 403 if API_KEY is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, projectController_1.listAllProjects)(mockRequest, mockResponse);
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Forbidden: API_KEY is missing or invalid' });
    }));
    it('should return 403 if API_KEY is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.query = { api_key: 'wrong_key' };
        yield (0, projectController_1.listAllProjects)(mockRequest, mockResponse);
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Forbidden: API_KEY is missing or invalid' });
    }));
    it('should return 200 with projects if API_KEY is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }];
        projectRepository_1.listProjects.mockResolvedValue(mockProjects);
        process.env.API_KEY_NODE = 'valid_api_key';
        mockRequest.query = { api_key: 'valid_api_key' };
        yield (0, projectController_1.listAllProjects)(mockRequest, mockResponse);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockProjects);
        expect(projectRepository_1.listProjects).toHaveBeenCalledTimes(1);
    }));
    it('should return 500 if listProjects throws an error', () => __awaiter(void 0, void 0, void 0, function* () {
        projectRepository_1.listProjects.mockRejectedValue(new Error('Database error'));
        process.env.API_KEY_NODE = 'valid_api_key';
        mockRequest.query = { api_key: 'valid_api_key' };
        yield (0, projectController_1.listAllProjects)(mockRequest, mockResponse);
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error, try it later: Error: Database error' });
    }));
});
//# sourceMappingURL=listAllProjects.test.js.map