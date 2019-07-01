import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupEntity {
  id: number;
  request: RequestEntity;
  requestId: number;
  form: FormEntity;
  formId: number;
  requests?: RequestResponseList[];

  constructor(data: any) {
    console.log("GroupE:",data);
    this.id = data.Id;
    this.request = data.Request;
    this.requestId = data.RequestId;
    this.form = data.FormEntity;
    this.formId = data.FormId;
    this.requests = data.RequestEntities;
  }
}

export default GroupEntity;
