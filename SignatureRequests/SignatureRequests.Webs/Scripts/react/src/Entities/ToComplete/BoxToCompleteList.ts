import BoxToComplete from "./BoxToComplete";

class BoxToCompleteList {
  count: number;
  collection: BoxToComplete[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.BoxesList.map((d:BoxToComplete) => new BoxToComplete(d));
  }
}

export default BoxToCompleteList;