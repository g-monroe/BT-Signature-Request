import RequestEntity from "./RequestEntity";
import SignatureEntity from "./SignatureEntity";
import FormEntity from "./FormEntity";

class BoxEntity {
  id: number;
  width: number;
  height: number;
  xVal : number;
  yVal: number;
  type: string;
  signerType: string;
  signedStatus: string;
  request?: RequestEntity;
  signature?: SignatureEntity;
  form?: FormEntity;
  pageNumber: number;
  isModel: boolean;

  constructor(data: any) {
    this.id = data.Id;
    this.width = data.Width;
    this.height = data.Height;
    this.xVal = data.X;
    this.yVal = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.request = data.Request;
    this.signature = data.Signature;
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
  }
}

export default BoxEntity;
