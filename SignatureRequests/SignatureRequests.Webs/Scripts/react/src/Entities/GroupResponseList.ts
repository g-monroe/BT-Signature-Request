import GroupEntity from "./GroupEntity";

class GroupResponseList {
  count: number;
  collection: GroupEntity[];

  constructor(data: any) {
    if (data.TotalResults != undefined){
      this.count = data.TotalResults;
    }else{
      this.count = 0;
    }
    if(data.GroupsList){
      this.collection = data.GroupsList.map((d:GroupEntity) => new GroupEntity(d));
    }else{
      this.collection = [] as GroupEntity[];
    }
  }
}

export default GroupResponseList;