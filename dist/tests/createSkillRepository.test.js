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
const skillsRepository_1 = require("../repositories/skillsRepository");
const database_1 = __importDefault(require("../database/database"));
const skills_1 = __importDefault(require("../models/skills"));
jest.mock('../database/database', () => {
    return {
        query: jest.fn(),
    };
});
jest.mock('../models/skills', () => jest.fn());
describe('Skills Repository', () => {
    const mockSkillData = {
        title: 'JavaScript',
        rate: 5,
    };
    beforeEach(() => {
        jest.clearAllMocks();
        skills_1.default.mockReturnValue(mockSkillData);
    });
    test('should successfully insert a new skill into the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQueryResult = { rows: [mockSkillData] };
        database_1.default.query.mockResolvedValue(mockQueryResult);
        const result = yield (0, skillsRepository_1.createNewSkill)(mockSkillData);
        expect(skills_1.default).toHaveBeenCalledWith(mockSkillData);
        expect(database_1.default.query).toHaveBeenCalledWith('INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *', [
            mockSkillData.title,
            mockSkillData.rate,
        ]);
        expect(result).toEqual(mockSkillData);
    }));
    test('should throw an error if the database insertion fails', () => __awaiter(void 0, void 0, void 0, function* () {
        database_1.default.query.mockRejectedValue(new Error('Database error'));
        yield expect((0, skillsRepository_1.createNewSkill)(mockSkillData)).rejects.toThrow('Database error');
    }));
    test('should use the correct SQL query format', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQueryResult = { rows: [mockSkillData] };
        database_1.default.query.mockResolvedValue(mockQueryResult);
        yield (0, skillsRepository_1.createNewSkill)(mockSkillData);
        const sqlQuery = database_1.default.query.mock.calls[0][0];
        expect(sqlQuery).toBe('INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *');
    }));
});
//# sourceMappingURL=createSkillRepository.test.js.map