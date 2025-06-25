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
exports.updateSkillById = exports.deleteSkillById = exports.createNewSkill = exports.listSkills = void 0;
const database_1 = __importDefault(require("../database/database"));
const skills_1 = __importDefault(require("../models/skills"));
const listSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.query('SELECT * FROM skills');
        const projects = result.rows.map((row) => (0, skills_1.default)(row));
        return projects;
    }
    catch (err) {
        throw err;
    }
});
exports.listSkills = listSkills;
const createNewSkill = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, rate } = (0, skills_1.default)(data);
        const sql = `INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *`;
        const values = [title, rate];
        const res = yield database_1.default.query(sql, values);
        return res.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createNewSkill = createNewSkill;
const deleteSkillById = (skillId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `DELETE FROM skills WHERE id = $1 RETURNING *`;
        const values = [skillId];
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
exports.deleteSkillById = deleteSkillById;
const updateSkillById = (skillId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setClause = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const whereClause = Object.keys(skillId).map((key, index) => `${key} = $${index + 1 + Object.keys(data).length}`).join(' AND ');
        const sql = `UPDATE skills SET ${setClause} WHERE ${whereClause} RETURNING *`;
        const values = [...Object.values(data), ...Object.values(skillId)];
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
exports.updateSkillById = updateSkillById;
//# sourceMappingURL=skillsRepository.js.map