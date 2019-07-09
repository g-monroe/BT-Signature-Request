import FormEntity from "./FormEntity";

class FormResponseList {
  count: number;
  collection: FormEntity[];

  constructor(data: any) {
    console.log("FormResponseList "+ data);
    this.count = data.TotalResults;
    this.collection = data.FormsList.map((d:FormEntity) => new FormEntity(d));
  }
}

export default FormResponseList;