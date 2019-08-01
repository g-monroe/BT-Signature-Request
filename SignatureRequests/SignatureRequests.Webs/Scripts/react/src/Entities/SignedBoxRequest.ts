
class SignedBoxRequest {
  id: number;
  signedStatus: string;
  signatureId: number;
  isModel: boolean;
  text?: string;
  date?: Date;
  filePath:string;


  constructor(data: any) {
    this.id = data.id;
    this.signedStatus = data.signedStatus;
    this.signatureId = data.signatureId;
    this.isModel = data.isModel;
    this.text = data.text;
    this.date = data.date;
    this.filePath = data.filePath;
  }
}

export default SignedBoxRequest;
