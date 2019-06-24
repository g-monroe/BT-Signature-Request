import RequestEntity from "./RequestEntity";
import SignatureEntity from "./SignatureEntity";

class BoxEntity {
  id: number;
  width: number;
  length: number;
  xVal : number;
  yVal: number;
  type: string;
  signerType: string;
  signedStatus: string;
  request: RequestEntity;
  signature?: SignatureEntity;

  constructor(data: any) {
    this.id = data.Id;
    this.width = data.Width;
    this.length = data.Length;
    this.xVal = data.X;
    this.yVal = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.request = data.Request;
    this.signature = data.Signature;
  }
}

export default BoxEntity;
