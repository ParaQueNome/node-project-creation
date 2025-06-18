"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectSchema = (data) => {
    var _a;
    return {
        id: (_a = data.id) !== null && _a !== void 0 ? _a : undefined,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
    };
};
exports.default = projectSchema;
//# sourceMappingURL=projects.js.map