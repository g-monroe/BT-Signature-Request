import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupResponse {
    id: number;
    form: FormEntity;
    formId: number;
    requests?: RequestResponseList[];
  
    constructor(data: any) {
      this.id = data.Id;
      this.form = data.FormEntity;
      this.formId = data.FormId;
      this.requests = data.RequestEntities;
    }
  }
  
  export default GroupResponse;