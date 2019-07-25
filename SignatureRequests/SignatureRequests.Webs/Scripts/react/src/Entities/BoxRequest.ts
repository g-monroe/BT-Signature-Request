
class BoxRequest {
  width: number;
  height: number;
  x : number;
  y: number;
  type: string;
  signerType: string;
  signedStatus: string;
  requestId?: number;
  signatureId?: number;
  formId?: number;
  pageNumber: number;
  isModel: boolean;
  text?: string;
  date?: Date;
  formHeight: number;
  formWidth: number;

  constructor(data: any) {
    this.width = data.width;
    this.height = data.height;
    this.x = data.x;
    this.y = data.y;
    this.type = data.type;
    this.signerType = data.signerType;
    this.signedStatus = data.signedStatus;
    this.requestId = data.requestId;
    this.signatureId = data.signatureId;
    this.formId = data.formId;
    this.pageNumber = data.pageNumber;
    this.isModel = data.isModel;
    this.text = data.text;
    this.date = data.date;
    this.formHeight = data.formHeight;
    this.formWidth = data.formWidth;
  }
}

export default BoxRequest;
