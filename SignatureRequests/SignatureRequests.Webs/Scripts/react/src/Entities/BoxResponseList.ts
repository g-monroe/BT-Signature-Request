import BoxEntity from "./BoxEntity";

class BoxResponseList {
  count: number;
  collection: BoxEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.BoxesList.map((d:BoxEntity) => new BoxEntity(d));
  }
}

export default BoxResponseList;