"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apps_service_1 = require("../../apps_service");
class service extends apps_service_1.service {
    constructor(name) {
        super(name);
        this.name = "users";
        this.get_entity = (id, includes = {}) => {
            return this.parent.get_entity(id, ["groups", "user_profiles"]);
        };
        this.pagination = (req, res = { locals: {} }) => {
            return this.parent.pagination(req, res);
        };
        this.save_entity = (newData) => {
            return this.parent.save_entity(newData);
        };
        this.update_entity = (id, newData) => {
            return this.parent.update_entity(id, newData);
        };
        this.delete_entity = (id) => {
            return this.parent.delete_entity(id);
        };
        this.conditions = (req) => {
            let search = this.search();
            search.query = req.query;
            search.limit = 10;
            search.page = req.params.page;
            search.append("id", search.like("%{word}%"));
            search.append("name", search.like("%{word}%"));
            search.append("mail", search.like("%{word}%"));
            search.append("group_id", search.like("%{word}%"));
            search.append("access_token", search.like("%{word}%"));
            search.append("refresh_token", search.like("%{word}%"));
            search.append("new_password", search.like("%{word}%"));
            search.append("confirm_password", search.like("%{word}%"));
            search.append("created_at", search.like("%{word}%"));
            search.append("updated_at", search.like("%{word}%"));
            return search.build();
        };
    }
}
exports.service = service;
