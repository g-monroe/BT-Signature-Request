
class BoxRequest {
  width: number;
  height: number;
  xVal : number;
  yVal: number;
  type: string;
  signerType: string;
  signedStatus: string;
  requestId?: number;
  signatureId?: number;
  formId?: number;
  pageNumber: number;
  isModel: boolean;

  constructor(data: any) {
    this.width = data.Width;
    this.height = data.Height;
    this.xVal = data.X;
    this.yVal = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.requestId = data.RequestId;
    this.signatureId = data.SignatureId;
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
  }
}

export default BoxRequest;
