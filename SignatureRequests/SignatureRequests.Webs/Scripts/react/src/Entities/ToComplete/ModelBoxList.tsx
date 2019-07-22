import ModelBox from "./ModelBox";

class ModelBoxList {
  count: number;
  collection: ModelBox[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.BoxesList.map((d:ModelBox) => new ModelBox(d));
  }
}

export default ModelBoxList;