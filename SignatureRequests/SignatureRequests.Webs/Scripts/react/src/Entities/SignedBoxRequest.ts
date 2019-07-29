
class SignedBoxRequest {
  id: number;
  signedStatus: string;
  signatureId: number;
  isModel: boolean;
  text?: string;
  date?: Date;


  constructor(data: any) {
    this.id = data.id;
    this.signedStatus = data.signedStatus;
    this.signatureId = data.signatureId;
    this.isModel = data.isModel;
    this.text = data.text;
    this.date = data.date;
  }
}

export default SignedBoxRequest;
