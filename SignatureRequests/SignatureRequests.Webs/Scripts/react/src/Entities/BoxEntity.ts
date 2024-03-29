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
  requestId: number;
  signature?: SignatureEntity;
  formId: number;
  pageNumber: number;
  isModel: boolean;
  text?: string;
  date?: Date;
  formHeight: number;
  formWidth: number;


  constructor(data: any) {
    
    this.id = data.Id;
    this.width = data.Width;
    this.height = data.Height;
    this.x = data.X;
    this.y = data.Y;
    this.type = data.Type;
    this.signerType = data.SignerType;
    this.signedStatus = data.SignedStatus;
    this.requestId = data.RequestId;
    this.signature = data.Signature;
    this.formId = data.FormId;
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
    this.text = data.Text;
    this.date = data.Date;
    this.formHeight = data.FormHeight;
    this.formWidth = data.FormWidth;
  }
}

export default BoxEntity;
