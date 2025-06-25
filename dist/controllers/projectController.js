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
exports.updateProject = exports.deleteProject = exports.createProject = exports.listAllProjects = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
const checkBodyRequest_1 = __importDefault(require("../utils/checkBodyRequest"));
const checkId_1 = __importDefault(require("../utils/checkId"));
const listAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        const response = yield (0, projectRepository_1.listProjects)();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.listAllProjects = listAllProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        if (!(0, checkBodyRequest_1.default)(data, req, res))
            return;
        const response = yield (0, projectRepository_1.createNewProject)(data);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.query.id);
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        if (!(0, checkId_1.default)(projectId, req, res))
            return;
        const response = yield (0, projectRepository_1.deleteProjectById)(projectId);
        if (response === null) {
            return res.status(404).json({ error: "The project you're trying to delete doesn't exists" });
        }
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.query.id);
    const data = req.body;
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        if (!(0, checkId_1.default)(projectId, req, res))
            return;
        if (!(0, checkBodyRequest_1.default)(data, req, res))
            return;
        const response = yield (0, projectRepository_1.updateProjectById)({ id: projectId }, data);
        if (response === null) {
            return res.status(404).json({ error: "The project you're trying to update doesn't exists" });
        }
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.updateProject = updateProject;
//# sourceMappingURL=projectController.js.map