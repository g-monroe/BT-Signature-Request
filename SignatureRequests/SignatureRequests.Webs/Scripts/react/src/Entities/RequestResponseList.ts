import RequestEntity from "../Entities/RequestEntity";

class RequestResponseList {
  count: number;
  collection: RequestEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    if(data.RequestsList){
      this.collection = data.RequestsList.map((d:RequestEntity) => new RequestEntity(d));
    }else{
      this.collection = [] as RequestEntity[];
    }
  }
}

export default RequestResponseList;