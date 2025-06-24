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
const projectRepository_1 = require("../repositories/projectRepository");
const mockQuery = jest.fn();
jest.mock('../database/database', () => ({
    pool: {
        query: mockQuery,
    },
}));
describe('updateProjectById', () => {
    const projectId = { id: 1 };
    const projectData = {
        title: 'New Title',
        description: 'New Description',
        thumbnail: 'new-thumbnail.png',
        url: 'https://new-url.com',
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return an updated project when the update is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProject = Object.assign({ id: 1 }, projectData);
        mockQuery.mockResolvedValueOnce({ rows: [updatedProject] });
        const result = yield (0, projectRepository_1.updateProjectById)(projectId, projectData);
        expect(result).toEqual(updatedProject);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith('UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *', [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]);
    }));
    it('should return null when the project is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockQuery.mockResolvedValueOnce({ rows: [] });
        const result = yield (0, projectRepository_1.updateProjectById)(projectId, projectData);
        expect(result).toBeNull();
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith('UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *', [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]);
    }));
    it('should throw an error if there is an error during the query', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Database error';
        mockQuery.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, projectRepository_1.updateProjectById)(projectId, projectData)).rejects.toThrow(errorMessage);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith('UPDATE projects SET title = $1, description = $2, thumbnail = $3, url = $4 WHERE id = $5 RETURNING *', [projectData.title, projectData.description, projectData.thumbnail, projectData.url, projectId.id]);
    }));
});
//# sourceMappingURL=updateProject.test.js.map