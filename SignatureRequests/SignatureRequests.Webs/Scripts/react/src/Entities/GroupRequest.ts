import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupRequest {
    formId: number;
  
    constructor(data: any) {
      this.formId = data.FormId;
    }
  }
  
  export default GroupRequest;