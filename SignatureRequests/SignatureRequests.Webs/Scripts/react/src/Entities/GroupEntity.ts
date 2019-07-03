import RequestEntity from "./RequestEntity";
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupEntity {
  id: number;
  form: FormEntity;
  formId: number;
<<<<<<< HEAD
  requests?: RequestResponseList;
=======
  requests: RequestResponseList;
>>>>>>> 9bd0fc8b368d3f98398dbf92f4ddad25d45a88bd

  constructor(data: any) {
    this.id = data.Id;
    this.form = data.Form;
    this.formId = data.FormId;
    this.requests = new RequestResponseList(data.RequestEntities);
  }
}

export default GroupEntity;
