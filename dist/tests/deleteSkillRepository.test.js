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
jest.mock('../database/database');
describe('deleteSkillById', () => {
    let mockQuery;
    beforeEach(() => {
        mockQuery = database_1.default.query;
        jest.clearAllMocks();
    });
    it('should delete a skill by ID and return the deleted skill', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillId = 1;
        const mockSkill = { id: skillId, title: 'JavaScript', rate: 5 };
        mockQuery.mockResolvedValue({ rows: [mockSkill] });
        const result = yield (0, skillsRepository_1.deleteSkillById)(skillId);
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM skills WHERE id = $1 RETURNING *', [skillId]);
        expect(result).toEqual(mockSkill);
    }));
    it('should return null if the skill does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillId = 999;
        mockQuery.mockResolvedValue({ rows: [] });
        const result = yield (0, skillsRepository_1.deleteSkillById)(skillId);
        expect(result).toBeNull();
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM skills WHERE id = $1 RETURNING *', [skillId]);
    }));
    it('should handle database errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const skillId = 1;
        mockQuery.mockRejectedValue(new Error('Database error'));
        yield expect((0, skillsRepository_1.deleteSkillById)(skillId)).rejects.toThrow('Database error');
        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM skills WHERE id = $1 RETURNING *', [skillId]);
    }));
});
//# sourceMappingURL=deleteSkillRepository.test.js.map