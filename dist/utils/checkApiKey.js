"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const checkApiKey = (req, res) => {
    const apiKeyFromQuery = req.query.api_key;
    if (!apiKeyFromQuery || apiKeyFromQuery !== process.env.API_KEY_NODE) {
        res.status(403).json({ error: 'Forbidden: API_KEY is missing or invalid' });
        return false;
    }
    return true;
};
exports.checkApiKey = checkApiKey;
//# sourceMappingURL=checkApiKey.js.map