import * as express from "express"
import * as path from "path"
import {router as apps_router} from "../../apps_router"
import {service} from "./service"
import {input_error} from "../../../base/core"


export class router extends apps_router {
    public name = "users"
    public service:service
    
    constructor(mount){
        super(mount)
        this.mount = mount
        this.service = new service(this.name)
        return this.create()
    }
    
    protected beforeRender = (req,res) => {
        this.csrfReady(req)
    }

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        let pagination = this.service.pagination()
        let conditions = this.service.conditions( req )
        let entities = pagination.find( conditions , req.query)
        let data = {}
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows
            data["page"] = result.pagination
            res.status(201)
            res.json(data)
        }).catch((error) => { 
            data[this.entities_name] = {}
            data["page"] = {}
            res.status(400)
            res.json(data)
        })
    }
   
    private entity = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model
        let data = {}
        model.findById( req.params.id ).then((result) => {
            if(!result){
                throw Error
            }
            res.status(201)
            res.json(result)
        }).catch((err) => {
            data[this.entities_name] = {}
            res.status(401)
            res.json(data)
        })        
    }
   
    private delete = (req:express.Request,res:express.Response) => {
        let model = this.model
        model.findById( req.params.id ).then((result) => {
            if(result){
                result.destroy().then( () => {
                    res.status(204)
                    res.json( {} )
                }).catch(e => {
                   res.status(500)
                   res.json({})
                })
            }else{
                res.status(500)
                res.json({})
            }
        })
    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {
        let entity = this.model.build(req.body)
        entity.save().then( (result) => {
            res.status(201)
            res.json(entity.dataValues)
        }).catch((err) => {
            res.status(400)
            res.json(this.service.validationError(err))
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        let model = this.model
        model.findById( req.params.id ).then((entity) => {
            entity.update(req.body).then( (result) => {
                res.status(201)
                res.json(result)
            }).catch((err) => {
                res.status(400)
                res.json(this.service.validationError(err))
            })
        }).catch((err) => {
            res.status(400)
            res.json(err)
        })
    }
    
    public login = ( req:express.Request,res:express.Response,next:express.NextFunction ) => {
        const passport = this.service.passport;
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.status(401)
                res.json({})
                return 
            }
            if (!user) {
                res.status(401)
                res.json({})
                return
            }
            req.logIn(user, (err) => {
                if (err) {
                    res.status(401)
                    res.json({})
                    return
                }
                res.status(201)
                res.json(user);
            });
        })(req, res, next);
    }

    public logout = ( req:express.Request,res:express.Response,next:express.NextFunction ) => {
        req.logOut();
        res.send(201)
    }

    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection
        let auth = this.isAuthenticated;
        let map = [ csrfProtection ]
        router.post("/login", csrfProtection , this.login);
        router.get("/", ...map , this.search)
        router.get("/page/:page", ...map , this.search)
        router.get("/:id", ...map , this.entity)
        router.post("/", ...map , this.insert)
        router.put("/:id", ...map ,this.update)
        router.delete("/:id", ...map , this.delete)
        return router
    }

}
