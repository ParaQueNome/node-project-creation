"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectSchema = (data) => {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
    };
};
exports.default = projectSchema;
//# sourceMappingURL=projects.js.map