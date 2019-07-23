import BoxType from "../../Util/Enums/BoxType";
import SignerType from "../../Util/Enums/SignerType";
import SignedStatus from "../../Util/Enums/SignedStatus";

class ModelBox {
  id: number;
  width: number;
  height: number;
  x : number;
  y: number;
  type: BoxType;
  signerType: SignerType;
  signedStatus: SignedStatus;
  requestId: number;
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
    this.pageNumber = data.PageNumber;
    this.isModel = data.IsModel;
    this.text = data.Text;
    this.date = data.Date;
    this.formHeight = data.FormHeight;
    this.formWidth = data.FormWidth;
  }
}

export default ModelBox;
