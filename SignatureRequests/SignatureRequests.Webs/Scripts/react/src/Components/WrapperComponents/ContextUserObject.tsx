import MainPageUser from '../../Entities/MainPageUser';
import UserType from '../../Util/Enums/UserTypes';


export class ContextUserObject{
    user:MainPageUser
    formId:number
    requestId:number
    FormId:number
    update:(data:MainPageUser) => void

    constructor(data?:any){
        if(data){
            this.user = data.user;
            this.formId = data.formId;
            this.requestId = data.requestId;
            this.update = data.update;
            this.FormId = data.FormId;
        }else{
            this.user = new MainPageUser({
                id: -1,
                role:"" ,
                name:"" ,
                email:"" ,
                type:UserType.UNKNOWN,
            });
            this.formId = -1;
            this.FormId = -1;
            this.requestId = -1;
            this.update= (data:MainPageUser) =>{
                this.user = data
            };
        }
    }
}
export default ContextUserObject;