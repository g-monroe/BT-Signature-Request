import UserEntity from "./UserEntity";

class FormEntity {
  id: number;
  filePath: string;
  title: string;
  description? : string;
  createDate: string;
  user: UserEntity;

  constructor(data: any) {
    this.id = data.Id;
    this.filePath = data.FilePath;
    this.title = data.Title;
    this.description = data.Description;
    this.createDate = data.CreateDate;
    this.user = data.User;
  }
}

export default FormEntity;
