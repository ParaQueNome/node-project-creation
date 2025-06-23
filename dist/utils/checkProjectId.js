"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkProjectId = (projectId, req, res) => {
    if (!projectId || projectId === undefined) {
        res.status(400).json({ error: "Bad Request: projectId expected" });
        return false;
    }
    return true;
};
exports.default = checkProjectId;
//# sourceMappingURL=checkProjectId.js.map