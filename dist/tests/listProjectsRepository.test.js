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
const projectRepository_1 = require("../repositories/projectRepository");
const database_1 = __importDefault(require("../database/database"));
const projects_1 = __importDefault(require("../models/projects"));
jest.mock('../database/database');
jest.mock('../models/projects');
describe('listProjects', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.end();
    }));
    it('should return an array of projects when the query is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRows = [
            { id: 1, name: 'Project 1', description: 'Description 1' },
            { id: 2, name: 'Project 2', description: 'Description 2' },
        ];
        const mockQueryResult = { rows: mockRows };
        database_1.default.query.mockResolvedValue(mockQueryResult);
        projects_1.default.mockImplementation((row) => ({
            id: row.id,
            name: row.name,
            description: row.description,
        }));
        const projects = yield (0, projectRepository_1.listProjects)();
        expect(database_1.default.query).toHaveBeenCalledWith('SELECT * FROM projects');
        expect(projects).toEqual([
            { id: 1, name: 'Project 1', description: 'Description 1' },
            { id: 2, name: 'Project 2', description: 'Description 2' },
        ]);
        expect(projects_1.default).toHaveBeenCalledTimes(mockRows.length);
    }));
    it('should throw an error if the query fails', () => __awaiter(void 0, void 0, void 0, function* () {
        database_1.default.query.mockRejectedValue(new Error('Database error'));
        yield expect((0, projectRepository_1.listProjects)()).rejects.toThrow('Database error');
        expect(database_1.default.query).toHaveBeenCalledWith('SELECT * FROM projects');
    }));
});
//# sourceMappingURL=listProjectsRepository.test.js.map