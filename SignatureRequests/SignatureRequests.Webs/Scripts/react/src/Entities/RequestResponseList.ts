import RequestEntity from "../Entities/RequestEntity";

class RequestResponseList {
  count: number;
  collection: RequestEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.FormsList.map((d:RequestEntity) => new RequestEntity(d));
  }
}

export default RequestResponseList;