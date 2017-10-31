"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_module_1 = require("../../../core/spa/stores/store_module");
const mutations_1 = require("./stores/mutations");
const actions_1 = require("./stores/actions");
const state_1 = require("./stores/state");
const getters_1 = require("./stores/getters");
const internal_crud_1 = require("../../resources/internal_crud");
class store_module extends store_module_1.store_module {
    constructor(options) {
        super();
        this.state = new state_1.state(options).map("all");
        this.actions = new actions_1.actions(options).map("all");
        this.mutations = new mutations_1.mutations(options).map("all");
        let local_getters = new getters_1.getters(options).map("all");
        let crud = () => {
            return new internal_crud_1.internal_crud(options);
        };
        this.getters = Object.assign({}, local_getters, { crud: crud });
    }
}
exports.store_module = store_module;