"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skills_1 = __importDefault(require("../models/skills"));
describe('skillsSchema', () => {
    it('should create a valid skills object', () => {
        const data = {
            id: 1,
            title: 'JavaScript',
            rate: 5,
        };
        const skill = (0, skills_1.default)(data);
        expect(skill).toEqual({
            id: 1,
            title: 'JavaScript',
            rate: 5,
        });
    });
    it('should handle different skill attributes', () => {
        const data = {
            id: 2,
            title: 'TypeScript',
            rate: 4,
        };
        const skill = (0, skills_1.default)(data);
        expect(skill).toEqual({
            id: 2,
            title: 'TypeScript',
            rate: 4,
        });
    });
    it('should not include additional properties', () => {
        const data = {
            id: 3,
            title: 'Python',
            rate: 3,
            extraProperty: 'This should be ignored',
        };
        const skill = (0, skills_1.default)(data);
        expect(skill).toEqual({
            id: 3,
            title: 'Python',
            rate: 3,
        });
    });
});
//# sourceMappingURL=skillsSchema.test.js.map