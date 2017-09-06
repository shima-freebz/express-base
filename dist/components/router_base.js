"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class router_base {
    constructor() {
        this.name = "router_base";
        this.useModel = true;
        this.vars = { "title": "", "csrf": "" };
        this.init = (name) => {
            this.loadService(name);
        };
        this.loadService = (name) => {
            let sep = common_1.config.sep;
            let service = require("." + sep + this.name + sep + name + "_service");
            this.service = new service[name + "_service"](this.name);
        };
        this.csrfReady = (req, formHelper = "form") => {
            this.vars[formHelper].bind({ "csrf": req.csrfToken() });
        };
        this.bind = (router) => {
            return router;
        };
        this.create = () => {
            const express = require("express");
            let router = express.Router();
            this.init(this.name);
            this.bind(router);
            return router;
        };
        this.beforeRender = (req, res) => {
        };
        this.render = (req, res, view = "", vars = {}) => {
            this.beforeRender(req, res);
            let f = view.substring(1, 1);
            let sep = common_1.config.sep;
            if (f !== "." && f !== sep) {
                view = this.name + sep + view;
            }
            this.setData(vars);
            res.render(view, this.vars);
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
        let bodyParser = require('body-parser');
        let parseForm = bodyParser.urlencoded({ extended: false });
        let csrf = require('csurf');
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
    /*
        view で使うヘルパーのロード
    */
    loadHelper(name) {
        let sep = common_1.config.sep;
        this.vars[name] = require(".." + sep + "helpers" + sep + name + "_helper");
    }
}
exports.router_base = router_base;