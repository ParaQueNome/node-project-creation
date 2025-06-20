"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const projectController_1 = require("../controllers/projectController");
router.get('/listProjects', (req, res) => {
    (0, projectController_1.listAllProjects)(req, res);
});
router.post('/createProject', (req, res) => {
    (0, projectController_1.createProject)(req, res);
});
router.delete('/deleteProject', (req, res) => {
    (0, projectController_1.deleteProject)(req, res);
});
exports.default = router;
//# sourceMappingURL=routes.js.map