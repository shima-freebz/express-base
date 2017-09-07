"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_base_1 = require("../service_base");
class tasks_service extends service_base_1.service_base {
    constructor(name) {
        super(name);
        this.whereBuild = (query) => {
            let where = this.search(query);
            return where.build;
        };
    }
}
exports.tasks_service = tasks_service;
