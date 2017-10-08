"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
const api_1 = require("./api");
const Interface_1 = require("./Interface");
vue_1.default.use(vuex_1.default);
let increment = (state) => {
    state.count++;
};
function createStore(options = Interface_1.createOptions) {
    let api = new api_1.Internal({
        host: options.host,
        entities: options.entities,
        entity: options.entity,
        request: options.request
    });
    let vuex = {
        state: {
            domain: options.entities,
            tasks: {}
        },
        actions: {
            fetchEntities({ commit }, query = { page: 1, search: "" }) {
                return api.entities(query).then((entities) => {
                    commit("setEntities", entities);
                });
            }
        },
        mutations: {
            setEntities: (state, entities) => {
                console.log(12);
                let ek = entities.tasks;
                let tasks = {};
                for (let i = 0; i < ek.length; i++) {
                    tasks[ek[i].id] = ek[i];
                }
                state.tasks = tasks;
                state.page = entities.page;
            },
        }
    };
    return new vuex_1.default.Store(vuex);
}
exports.createStore = createStore;
