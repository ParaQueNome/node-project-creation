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
exports.createProject = exports.listAllProjects = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
const listAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKeyFromQuery = req.query.api_key;
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        const response = yield (0, projectRepository_1.listProjects)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.listAllProjects = listAllProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const apiKeyFromQuery = req.query.api_key;
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        if (!data || data === undefined) {
            return res.status(400).json({ error: 'Bad Request: Request Body required' });
        }
        const response = yield (0, projectRepository_1.createNewProject)(data);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.createProject = createProject;
//# sourceMappingURL=projectController.js.map