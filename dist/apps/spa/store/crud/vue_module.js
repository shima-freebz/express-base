"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_module_1 = require("../vue_module");
const mutations_1 = require("./mutations");
const actions_1 = require("./actions");
const state_1 = require("./state");
const getters_1 = require("./getters");
const internal_1 = require("../../api/internal");
class vue_module extends vue_module_1.vue_module {
    constructor(options) {
        super();
        this.state = new state_1.state(options).map("all");
        this.actions = new actions_1.actions(options).map("all");
        this.mutations = new mutations_1.mutations(options).map("all");
        let gettersInstance = new getters_1.getters(options).map("all");
        let api = function () {
            return new internal_1.internal({
                host: options.host,
                endPoint: options.endPoint,
                request: options.request,
                service: options.service
            });
        };
        this.getters = Object.assign({}, gettersInstance, { "api": api });
    }
}
exports.vue_module = vue_module;
