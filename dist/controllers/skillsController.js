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
exports.listAllSkills = void 0;
const skillsRepository_1 = require("../repositories/skillsRepository");
const checkApiKey_1 = require("../utils/checkApiKey");
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
//# sourceMappingURL=skillsController.js.map