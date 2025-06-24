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
jest.mock('../database/database');
jest.mock('../models/skills');
describe('listSkills', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.end();
    }));
    it('should return an array of skills when the query is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRows = [
            { id: 1, title: 'JavaScript', rate: 5 },
            { id: 2, title: 'TypeScript', rate: 4 },
        ];
        const mockQueryResult = { rows: mockRows };
        database_1.default.query.mockResolvedValue(mockQueryResult);
        skills_1.default.mockImplementation((row) => ({
            id: row.id,
            title: row.title,
            rate: row.rate,
        }));
        const skills = yield (0, skillsRepository_1.listSkills)();
        expect(database_1.default.query).toHaveBeenCalledWith('SELECT * FROM skills');
        expect(skills).toEqual([
            { id: 1, title: 'JavaScript', rate: 5 },
            { id: 2, title: 'TypeScript', rate: 4 },
        ]);
        expect(skills_1.default).toHaveBeenCalledTimes(mockRows.length);
    }));
    it('should throw an error if the query fails', () => __awaiter(void 0, void 0, void 0, function* () {
        database_1.default.query.mockRejectedValue(new Error('Database error'));
        yield expect((0, skillsRepository_1.listSkills)()).rejects.toThrow('Database error');
        expect(database_1.default.query).toHaveBeenCalledWith('SELECT * FROM skills');
    }));
});
//# sourceMappingURL=listSkillsRepository.test.js.map