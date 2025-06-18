"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const projectRepository = __importStar(require("../repositories/projectRepository"));
const checkApiKeyModule = __importStar(require("../utils/checkApiKey"));
jest.mock('../repositories/projectRepository');
jest.mock('../utils/checkApiKey');
describe('deleteProject Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let responseJson;
    let checkApiKeyMock;
    let deleteProjectByIdMock;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
        responseJson = mockResponse.json;
        checkApiKeyMock = jest.spyOn(checkApiKeyModule, 'checkApiKey');
        deleteProjectByIdMock = projectRepository.deleteProjectById;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return 400 if projectId is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.query = {}; // Sem projectId
        checkApiKeyMock.mockReturnValue(true);
        yield (0, projectController_1.deleteProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ error: "Bad Request: projectId expected" });
        expect(deleteProjectByIdMock).not.toHaveBeenCalled();
    }));
    it('should return 403 if apiKey is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.query = { id: '1', api_key: 'wrong_key' };
        checkApiKeyMock.mockImplementation((req, res) => {
            res.status(403).json({ message: 'Invalid API Key' });
            return false;
        });
        yield (0, projectController_1.deleteProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(responseJson).toHaveBeenCalledWith({ message: 'Invalid API Key' });
        expect(deleteProjectByIdMock).not.toHaveBeenCalled();
    }));
    it('should delete a project and return 200 with the deleted project data', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 1;
        const mockDeletedProject = { id: projectId, name: 'Deleted Project' };
        mockRequest.query = { id: String(projectId) };
        checkApiKeyMock.mockReturnValue(true);
        deleteProjectByIdMock.mockResolvedValue(mockDeletedProject);
        yield (0, projectController_1.deleteProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseJson).toHaveBeenCalledWith(mockDeletedProject);
        expect(deleteProjectByIdMock).toHaveBeenCalledWith(projectId);
    }));
    it('should handle errors and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 1;
        mockRequest.query = { id: String(projectId) };
        checkApiKeyMock.mockReturnValue(true);
        deleteProjectByIdMock.mockRejectedValue(new Error('Database error'));
        yield (0, projectController_1.deleteProject)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseJson).toHaveBeenCalledWith({ error: `Internal server error, try it later: Error: Database error` });
        expect(deleteProjectByIdMock).toHaveBeenCalledWith(projectId);
    }));
});
//# sourceMappingURL=deleteProject.test.js.map