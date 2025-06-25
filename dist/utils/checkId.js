"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkId = (id, req, res) => {
    if (!id || id === undefined) {
        res.status(400).json({ error: "Bad Request: projectId expected" });
        return false;
    }
    return true;
};
exports.default = checkId;
//# sourceMappingURL=checkId.js.map