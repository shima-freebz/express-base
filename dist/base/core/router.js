"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const csurf = require("csurf");
const core_1 = require("../core");
class router {
    constructor() {
        this.name = "router";
        this.useModel = true;
        this.vars = { "title": "", "csrf": "", "hlp": {} };
        this.csrfReady = (req, form = "form") => {
            let csrf = req.csrfToken();
            this.vars["csrf"] = csrf;
            this.vars.hlp[form].bind = { "csrf": csrf };
        };
        this.bind = (router) => {
            return router;
        };
        this.create = () => {
            const express = require("express");
            let router = express.Router();
            this.bind(router);
            return router;
        };
        this.beforeRender = (req, res) => {
        };
        this.loading = () => __awaiter(this, void 0, void 0, function* () {
            // helper loading
            let helpers = this.vars.hlp;
            for (var key in helpers) {
                yield helpers[key].load();
            }
            return true;
        });
        this.render = (req, res, view = "", vars = {}) => {
            this.setData(vars);
            this.beforeRender(req, res);
            let loading = this.loading();
            loading.then((result) => {
                let f = view.substring(1, 1);
                let sep = core_1.config.sep;
                if (f !== "." && f !== sep) {
                    let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                    let dir = viewDir + "apps" + sep + this.name + sep + "views";
                    req.app.set('views', dir);
                    view = view;
                }
                res.render(view, this.vars, (err, html) => {
                    if (!err) {
                        res.send(html);
                        return;
                    }
                    let viewDir = __dirname + sep + ".." + sep + ".." + sep;
                    req.app.set('views', viewDir + "apps" + sep + "common" + sep + "views");
                    res.status = err.status;
                    res.render("error", { "message": err.message, "error": err });
                });
            }).catch((err) => {
                res.status(500);
                res.send("error", { error: err });
            });
        };
        this.send = (req, res, content) => {
            res.send(content);
        };
        /**
         * view に渡す変数に追加
         */
        this.setData = (vars) => {
            this.vars = Object.assign(this.vars, vars);
        };
        let parseForm = bodyParser.urlencoded({ extended: false });
        let csrf = csurf;
        let csrfProtection = csrf({ cookie: true });
        this.csrfProtection = csrfProtection;
        this.parseForm = parseForm;
    }
    get models() {
        return this.service.models;
    }
    get model() {
        return this.service.model;
    }
    /**
     * post 判定
     */
    isPost(res) {
        return (res.method === "POST") ? true : false;
    }
    /*
        ajax 判定
    */
    isXhr(res) {
        return res.xhr;
    }
    helper(name, helper) {
        this.vars.hlp[name] = helper;
    }
}
exports.router = router;
