"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../service");
class service extends service_1.service {
    constructor(name) {
        super(name);
        this.name = "users";
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 10;
            search.page = req.params.page;
            search.append("id", search.like("%{word}%"));
            search.append("name", search.like("%{word}%"));
            search.append("mail", search.like("%{word}%"));
            search.append("group_id", search.like("%{word}%"));
            search.append("new_password", search.like("%{word}%"));
            search.append("confirm_password", search.like("%{word}%"));
            search.append("created_at", search.like("%{word}%"));
            search.append("updated_at", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.service = service;
