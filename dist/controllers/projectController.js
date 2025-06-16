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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const projectRepository_1 = __importDefault(require("../repositories/projectRepository"));
const listAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKeyFromQuery = req.query.api_key;
    try {
        if (!apiKeyFromQuery || apiKeyFromQuery !== process.env.API_KEY_NODE) {
            return res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
        }
        const response = yield (0, projectRepository_1.default)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.default = listAllProjects;
//# sourceMappingURL=projectController.js.map