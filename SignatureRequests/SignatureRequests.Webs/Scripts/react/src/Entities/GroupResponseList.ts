import GroupEntity from "./GroupEntity";

class GroupResponseList {
  count: number;
  collection: GroupEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    if(data.GroupsList){
      this.collection = data.GroupsList.map((d:GroupEntity) => new GroupEntity(d));
    }else{
      this.collection = [] as GroupEntity[];
    }
  }
}

export default GroupResponseList;