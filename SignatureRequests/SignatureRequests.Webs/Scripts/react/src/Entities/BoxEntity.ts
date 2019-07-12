import RequestEntity from "./RequestEntity";


class BoxEntity {
  id: number;
  width: number;
  length: number;
  xVal : number;
  yVal: number;
  type: string;
  signerType: string;
  signedStatus: string;

  constructor(data: any) {
    this.id = data.Id;
    this.width = data.Width;
    this.length = data.Length;
    this.xVal = data.X;
    this.yVal = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
  }
}

export default BoxEntity;
