import {service as apps_service} from "../../apps_service"
import * as sequelize from "sequelize"
export class service extends apps_service{
    name = "tasks"
    constructor(name:string){
        super(name)
        this.name = name;
    }
    
    public get_entity = (id : string,includes = {}) => {
        return this.parent.get_entity(id)
    }        

    public pagination  = ( req, res = {locals:{}} ) => {
        return this.parent.pagination(req,res)
    }

    public save_entity = (newData) => {
        return this.parent.save_entity(newData)
    }

    public update_entity = (id , newData)=>{
        return this.parent.update_entity(id,newData) 
    }

    public delete_entity = (id) => {
        return this.parent.delete_entity(id);
    }

    public conditions = (req) : { where : sequelize.WhereLogic,limit:number,offset:number } =>{
        let search = this.search()
        search.query = req.query
        search.limit = 10
        search.page = req.params.page
        search.append("id",search.like("%{word}%"))
        search.append("title",search.like("%{word}%"))
        search.append("priod",search.like("%{word}%"))
        search.append("created_at",search.like("%{word}%"))
        search.append("updated_at",search.like("%{word}%"))
        return search.build()
    }


}

