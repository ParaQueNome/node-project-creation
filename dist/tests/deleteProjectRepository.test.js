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
jest.mock('../database/database', () => ({
    query: jest.fn()
}));
describe('deleteProjectById', () => {
    let mockQuery;
    beforeEach(() => {
        mockQuery = database_1.default.query;
    });
    afterEach(() => {
        mockQuery.mockClear();
    });
    it('should delete a project by ID and return the deleted project', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 1;
        const mockProject = { id: projectId, name: 'Test Project' };
        mockQuery.mockResolvedValue({ rows: [mockProject] });
        const result = yield (0, projectRepository_1.deleteProjectById)(projectId);
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM projects WHERE id = $1 RETURNING *', [projectId]);
        expect(result).toEqual(mockProject);
    }));
    it('should throw an error if the project does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 999;
        mockQuery.mockResolvedValue({ rows: [] });
        yield expect((0, projectRepository_1.deleteProjectById)(projectId)).rejects.toThrow("The project you're trying to delete doesn't exists");
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM projects WHERE id = $1 RETURNING *', [projectId]);
    }));
    it('should handle database errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 1;
        mockQuery.mockRejectedValue(new Error('Database error'));
        yield expect((0, projectRepository_1.deleteProjectById)(projectId)).rejects.toThrow('Database error');
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM projects WHERE id = $1 RETURNING *', [projectId]);
    }));
});
//# sourceMappingURL=deleteProjectRepository.test.js.map