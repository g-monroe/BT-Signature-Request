import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupResponse {
    id: number;
    request: RequestEntity;
    requestId: number;
    form: FormEntity;
    formId: number;
    requests?: RequestResponseList[];
  
    constructor(data: any) {
      this.id = data.Id;
      this.request = data.Request;
      this.requestId = data.RequestId;
      this.form = data.FormEntity;
      this.formId = data.FormId;
      this.requests = data.RequestEntities;
    }
  }
  
  export default GroupResponse;