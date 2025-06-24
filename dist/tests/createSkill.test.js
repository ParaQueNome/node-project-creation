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
const skillsController_1 = require("../controllers/skillsController");
const skillsRepository_1 = require("../repositories/skillsRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
const checkBodyRequest_1 = __importDefault(require("../utils/checkBodyRequest"));
jest.mock('../repositories/skillsRepository');
jest.mock('../utils/checkApiKey');
jest.mock('../utils/checkBodyRequest');
describe('createSkill Controller', () => {
    let mockRequest;
    let mockResponse;
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
        responseJson = null;
    });
    it('should return 400 if rate is out of bounds', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillData = { title: 'JavaScript', rate: 0 };
        mockRequest.body = skillData;
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        checkBodyRequest_1.default.mockReturnValue(true);
        yield (0, skillsController_1.createSkill)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(responseJson).toEqual({ error: 'Bad request: rate must be a number beetween 1-10' });
    }));
    it('should return 403 if API key is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest.query = { api_key: 'wrong_key' };
        checkApiKey_1.checkApiKey.mockImplementation((req, res) => {
            res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
            return false;
        });
        yield (0, skillsController_1.createSkill)(mockRequest, mockResponse);
        expect(checkApiKey_1.checkApiKey).toHaveBeenCalledWith(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(responseJson).toEqual({ error: 'Forbidden: API_KEY is missing or invalid' });
    }));
    it('should call addNewSkill and return 200 with the created skill data', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillData = { title: 'JavaScript', rate: 5 };
        mockRequest.body = skillData;
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        checkBodyRequest_1.default.mockReturnValue(true);
        skillsRepository_1.createNewSkill.mockResolvedValue(skillData);
        yield (0, skillsController_1.createSkill)(mockRequest, mockResponse);
        expect(skillsRepository_1.createNewSkill).toHaveBeenCalledWith(skillData);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseJson).toEqual(skillData);
    }));
    it('should handle errors and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillData = { title: 'JavaScript', rate: 5 };
        mockRequest.body = skillData;
        checkApiKey_1.checkApiKey.mockReturnValue(true);
        checkBodyRequest_1.default.mockReturnValue(true);
        skillsRepository_1.createNewSkill.mockRejectedValue(new Error('Database error'));
        yield (0, skillsController_1.createSkill)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(responseJson.error).toContain('Internal server error, try it later');
    }));
});
//# sourceMappingURL=createSkill.test.js.map