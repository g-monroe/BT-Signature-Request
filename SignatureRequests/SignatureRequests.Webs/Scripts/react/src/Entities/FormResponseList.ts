import UserEntity from "./UserEntity";
import FormEntity from "./FormEntity";

class FormResponseList {
  count: number;
  collection: FormEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.FormsList.map((d:FormEntity) => new FormEntity(d));
  }
}

export default FormResponseList;