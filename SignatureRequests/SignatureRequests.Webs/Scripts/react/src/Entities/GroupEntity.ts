import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupEntity {
  id: number;
  form: FormEntity;
  formId: number;
  requests: RequestResponseList;

  constructor(data: any) {
    this.id = data.Id;
    this.form = new FormEntity(data.Form);
    this.formId = data.FormId;
    this.requests = new RequestResponseList(data.RequestEntities);
  }
}

export default GroupEntity;
