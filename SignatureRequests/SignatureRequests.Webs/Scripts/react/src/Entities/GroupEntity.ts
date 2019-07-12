
import FormEntity from "./FormEntity";
import RequestResponseList from "./RequestResponseList";

class GroupEntity {
  id: number;
  form: FormEntity;
  formId: number;
  title: string;
  description: string;
  dueDate: Date;
  createDate: Date;
  status: string;
  requests: RequestResponseList;

  constructor(data: any) {
    this.id = data.Id;
    this.form = new FormEntity(data.Form);
    this.formId = data.FormId;
    this.title = data.Title;
    this.dueDate = data.DueDate;
    this.createDate = data.CreateDate;
    this.description = data.Description;
    this.status = data.Status;
    this.requests = new RequestResponseList(data.RequestEntities);
  }
}

export default GroupEntity;
