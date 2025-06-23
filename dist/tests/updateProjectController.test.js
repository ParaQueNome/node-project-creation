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
const apiKeyModule = __importStar(require("../utils/checkApiKey"));
const projectService = __importStar(require("../repositories/projectRepository"));
jest.mock('../utils/checkApiKey');
jest.mock('../repositories/projectRepository');
const mockRequest = () => {
    const req = {};
    req.query = {};
    req.body = {};
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};
describe('updateProject Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        jest.clearAllMocks();
    });
    test('should return early if API key validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockImplementation((req, res) => {
            res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
            return false;
        });
        yield (0, projectController_1.updateProject)(req, res);
        expect(apiKeyModule.checkApiKey).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Forbidden: API_KEY is missing or invalid'
        });
    }));
    test('should return 400 if projectId is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockReturnValueOnce(true);
        req.query = {};
        yield (0, projectController_1.updateProject)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Bad Request: projectId expected"
        });
    }));
    test('should return 400 if request body is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockReturnValueOnce(true);
        req.query.id = "1";
        req.body = undefined;
        yield (0, projectController_1.updateProject)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Bad Request: Request Body required'
        });
    }));
    test('should return 404 if project does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockReturnValueOnce(true);
        req.query.id = "1";
        req.body = { name: "Updated Project" };
        projectService.updateProjectById.mockResolvedValueOnce(null);
        yield (0, projectController_1.updateProject)(req, res);
        expect(projectService.updateProjectById).toHaveBeenCalledWith({ id: 1 }, { name: "Updated Project" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "The project you're trying to update doesn't exists"
        });
    }));
    test('should return 200 with updated project data on success', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockReturnValueOnce(true);
        req.query.id = "1";
        req.body = { name: "Updated Project" };
        const mockUpdatedProject = { id: 1, name: "Updated Project" };
        projectService.updateProjectById.mockResolvedValueOnce(mockUpdatedProject);
        yield (0, projectController_1.updateProject)(req, res);
        expect(projectService.updateProjectById).toHaveBeenCalledWith({ id: 1 }, { name: "Updated Project" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdatedProject);
    }));
    test('should return 500 if an error occurs during processing', () => __awaiter(void 0, void 0, void 0, function* () {
        apiKeyModule.checkApiKey.mockReturnValueOnce(true);
        req.query.id = "1";
        req.body = { name: "Updated Project" };
        const errorMessage = "Database connection failed";
        projectService.updateProjectById.mockRejectedValueOnce(new Error(errorMessage));
        yield (0, projectController_1.updateProject)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            error: expect.stringContaining(errorMessage)
        }));
    }));
});
//# sourceMappingURL=updateProjectController.test.js.map