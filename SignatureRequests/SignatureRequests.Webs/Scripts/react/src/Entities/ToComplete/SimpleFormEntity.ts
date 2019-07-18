
class SimpleFormEntity {
  id: number;
  filePath: string;
  numPages: number;

  constructor(data: any) {
    this.id = data.Id;
    this.filePath = data.FilePath;
    this.numPages = data.NumPages;
  }
}

export default SimpleFormEntity;
