
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
  formId: number;
  pageNumber: number;
  isModel: boolean;
  text?: string;
  date?: Date;

  constructor(data: any) {
    this.width = data.Width;
    this.height = data.Height;
    this.x = data.X;
    this.y = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.requestId = data.RequestId;
    this.signatureId = data.SignatureId;
    this.formId = data.FormId;
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
    this.text = data.Text;
    this.date = data.Date;
  }
}

export default BoxRequest;
