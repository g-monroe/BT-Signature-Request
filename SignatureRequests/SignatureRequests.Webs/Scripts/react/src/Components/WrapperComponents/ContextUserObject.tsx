import MainPageUser from '../../Entities/MainPageUser';
import UserType from '../../Util/Enums/UserTypes';


export class ContextUserObject{
    user:MainPageUser
    update:(data:MainPageUser) => void

    constructor(data?:any){
        if(data){
            this.user = data.user;
            this.update = data.update;
        }else{
            this.user = new MainPageUser({
                id: -1,
                role:"" ,
                name:"" ,
                email:"" ,
                type:UserType.UNKNOWN,
            });
            this.update= (data:MainPageUser) =>{
                this.user = data
            }
        }
    }
}
export default ContextUserObject;