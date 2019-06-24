import SignatureEntity from "../Entities/SignatureEntity";

class SignatureResponseList {
  count: number;
  collection: SignatureEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.FormsList.map((d:SignatureEntity) => new SignatureEntity(d));
  }
}

export default SignatureResponseList;