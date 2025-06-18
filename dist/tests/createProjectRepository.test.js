"use strict";
// createProjectRepository.test.ts
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
// Important: The proper way to mock the pool object
jest.mock('../database/database', () => {
    return {
        query: jest.fn(),
    };
});
jest.mock('../models/projects', () => jest.fn());
describe('Project Repository', () => {
    // Define mock data
    const mockProjectData = {
        title: 'Test Project',
        description: 'This is a test project',
        thumbnail: 'http://example.com/image.jpg',
        url: 'http://example.com',
    };
    // Before each test, reset mocks
    beforeEach(() => {
        jest.clearAllMocks();
        projects_1.default.mockReturnValue(mockProjectData);
    });
    test('should successfully insert a new project into the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Set up mock return value for database query
        const mockQueryResult = { rows: [mockProjectData] };
        // This is the correct way to mock the pool.query function
        database_1.default.query.mockResolvedValue(mockQueryResult);
        const result = yield (0, projectRepository_1.createNewProject)(mockProjectData);
        // Verify projectSchema was called with correct data
        expect(projects_1.default).toHaveBeenCalledWith(mockProjectData);
        // Verify SQL query was executed with correct parameters
        expect(database_1.default.query).toHaveBeenCalledWith('INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *', [
            mockProjectData.title,
            mockProjectData.description,
            mockProjectData.thumbnail,
            mockProjectData.url,
        ]);
        // Verify function returned expected result
        expect(result).toEqual(mockProjectData);
    }));
    test('should throw an error if the database insertion fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjectData = {
            title: 'Test Project',
            description: 'This is a test project',
            thumbnail: 'http://example.com/image.jpg',
            url: 'http://example.com',
        };
        // Mock a rejection for pool.query
        database_1.default.query.mockRejectedValue(new Error('Database error'));
        yield expect((0, projectRepository_1.createNewProject)(mockProjectData)).rejects.toThrow('Database insertion failed.');
    }));
    test('should throw an error if schema validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock schema validation to throw an error
        const validationError = new Error('Validation failed');
        projects_1.default.mockImplementation(() => {
            throw validationError;
        });
        // Spy on console.error to verify it's called with the correct error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        yield expect((0, projectRepository_1.createNewProject)(mockProjectData)).rejects.toThrow('Database insertion failed.');
        // Verify error was logged correctly
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting into database:', validationError);
        // Restore the original console.error function
        consoleErrorSpy.mockRestore();
    }));
    test('should use the correct SQL query format', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock successful query response
        const mockQueryResult = { rows: [mockProjectData] };
        database_1.default.query.mockResolvedValue(mockQueryResult);
        yield (0, projectRepository_1.createNewProject)(mockProjectData);
        // Check that the first argument to the first call of pool.query is the expected SQL query
        const sqlQuery = database_1.default.query.mock.calls[0][0];
        expect(sqlQuery).toBe('INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *');
    }));
});
//# sourceMappingURL=createProjectRepository.test.js.map