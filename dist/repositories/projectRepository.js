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
exports.deleteProjectById = exports.createNewProject = exports.listProjects = void 0;
const database_1 = __importDefault(require("../database/database"));
const projects_1 = __importDefault(require("../models/projects"));
const listProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.query('SELECT * FROM projects');
        const projects = result.rows.map((row) => (0, projects_1.default)(row));
        return projects;
    }
    catch (err) {
        throw err;
    }
});
exports.listProjects = listProjects;
const createNewProject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, thumbnail, url } = (0, projects_1.default)(data);
        const sql = `INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [title, description, thumbnail, url];
        const res = yield database_1.default.query(sql, values);
        return res.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createNewProject = createNewProject;
const deleteProjectById = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `DELETE FROM projects WHERE id = $1 RETURNING *`;
        const values = [projectId];
        const res = yield database_1.default.query(sql, values);
        if (!res.rows[0] || res.rows == undefined) {
            return null;
        }
        return res.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.deleteProjectById = deleteProjectById;
//# sourceMappingURL=projectRepository.js.map