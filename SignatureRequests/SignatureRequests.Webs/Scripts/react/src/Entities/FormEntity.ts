import UserEntity from "./UserEntity";
import GroupResponseList from "./GroupResponseList";
class FormEntity {
  id: number;
  filePath: string;
  title: string;
  description? : string;
  createDate: Date;
  user: UserEntity;
  numPages: number;
  groups: GroupResponseList | null;

  constructor(data: any) {
    this.id = data.Id;
    this.filePath = data.FilePath;
    this.title = data.Title;
    this.description = data.Description;
    this.createDate = data.CreateDate;
    this.user = data.User;
    this.numPages = data.NumPages;
    this.groups = data.GroupEntities ? new GroupResponseList(data.GroupEntities): null;
  }
}

export default FormEntity;
