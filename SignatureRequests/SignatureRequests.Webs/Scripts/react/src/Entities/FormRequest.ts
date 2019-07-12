
class FormRequest {
  filePath: string;
  title: string;
  description? : string;
  createDate: Date;
  userId: number;
  numPages: number;

  constructor(data: any) {
    this.filePath = data.FilePath;
    this.title = data.Title;
    this.description = data.Description;
    this.createDate = data.CreateDate;
    this.userId = data.UserId;
    this.numPages = data.NumPages;
  }
}

export default FormRequest;
