"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkBodyRequest = (data, req, res) => {
    if (!data || data === undefined) {
        res.status(400).json({ error: 'Bad Request: Request Body required' });
        return false;
    }
    return true;
};
exports.default = checkBodyRequest;
//# sourceMappingURL=checkBodyRequest.js.map