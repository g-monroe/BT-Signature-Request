import UserEntity from "./UserEntity";
import RequestResponseList from "./RequestResponseList";
class FormEntity {
  id: number;
  filePath: string;
  title: string;
  description? : string;
  createDate: Date;
  user: UserEntity;
  requests: RequestResponseList;
  constructor(data: any) {
    this.id = data.Id;
    this.filePath = data.FilePath;
    this.title = data.Title;
    this.description = data.Description;
    this.createDate = data.CreateDate;
    this.user = data.User;
    this.requests = data.RequestEntities;
    this.requests.count = data.RequestEntities.TotalResults;
    this.requests.collection = data.RequestEntities.RequestsList;
  }
}

export default FormEntity;
