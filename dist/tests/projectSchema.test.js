"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projects_1 = __importDefault(require("../models/projects"));
describe('projectSchema', () => {
    it('should create a valid project object', () => {
        const data = {
            id: 1,
            title: 'Test Project',
            description: 'A short description',
            thumbnail: 'http://example.com/thumbnail.jpg',
            url: 'http://example.com',
        };
        const project = (0, projects_1.default)(data);
        expect(project).toEqual({
            id: 1,
            title: 'Test Project',
            description: 'A short description',
            thumbnail: 'http://example.com/thumbnail.jpg',
            url: 'http://example.com',
        });
    });
    it('should handle missing description and thumbnail', () => {
        const data = {
            id: 1,
            title: 'Test Project',
            description: 'A short description',
            thumbnail: 'http://example.com/thumbnail.jpg',
            url: 'http://example.com',
        };
        const project = (0, projects_1.default)(data);
        expect(project).toEqual({
            id: 1,
            title: 'Test Project',
            description: 'A short description',
            thumbnail: 'http://example.com/thumbnail.jpg',
            url: 'http://example.com',
        });
    });
});
//# sourceMappingURL=projectSchema.test.js.map