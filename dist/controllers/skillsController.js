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
exports.addSkill = exports.listAllSkills = void 0;
const skillsRepository_1 = require("../repositories/skillsRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
const checkBodyRequest_1 = __importDefault(require("../utils/checkBodyRequest"));
const listAllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        const response = yield (0, skillsRepository_1.listSkills)();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.listAllSkills = listAllSkills;
const addSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (!(0, checkApiKey_1.checkApiKey)(req, res))
            return;
        if (!(0, checkBodyRequest_1.default)(data, req, res))
            return;
        if (data.rate > 10 || data.rate < 1) {
            return res.status(400).json({ error: 'Bad request: rate must be a number beetween 1-10' });
        }
        const response = yield (0, skillsRepository_1.addNewSkill)(data);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: `Internal server error, try it later: ${error}` });
    }
});
exports.addSkill = addSkill;
//# sourceMappingURL=skillsController.js.map