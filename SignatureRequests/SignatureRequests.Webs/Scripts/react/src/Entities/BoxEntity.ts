import RequestEntity from "./RequestEntity";
import SignatureEntity from "./SignatureEntity";
import FormEntity from "./FormEntity";

class BoxEntity {
  id: number;
  width: number;
  height: number;
  x : number;
  y: number;
  type: string;
  signerType: string;
  signedStatus: string;
  request?: RequestEntity;
  signature?: SignatureEntity;
  form: FormEntity;
  pageNumber: number;
  isModel: boolean;
  text?: string;
  date?: Date;


  constructor(data: any) {
    this.id = data.Id;
    this.width = data.Width;
    this.height = data.Height;
    this.x = data.X;
    this.y = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.request = data.Request;
    this.signature = data.Signature;
    this.form = data.Form;
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
    this.text = data.Text;
    this.date = data.Date;
  }
}

export default BoxEntity;
