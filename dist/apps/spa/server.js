"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
exports.default = context => {
    let server = (resolve, reject) => {
        let server = context.server;
        const { app, router, store } = app_1.createApp(server);
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                reject({ code: 404 });
            }
            Promise.all(matchedComponents.map((Component) => {
                if (Component.asyncData) {
                    store.commit("loading");
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
                if (!Component.extendOptions) {
                    return;
                }
                if (Component.extendOptions.asyncData) {
                    store.commit("loading/loading");
                    return Component.extendOptions.asyncData({
                        store, route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(e => {
                router.push({ path: context.mount });
                resolve(app);
            });
        }, reject);
    };
    return new Promise(server);
};
