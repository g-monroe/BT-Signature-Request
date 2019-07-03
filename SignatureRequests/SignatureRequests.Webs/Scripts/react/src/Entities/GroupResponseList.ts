import GroupEntity from "./GroupEntity";

class GroupResponseList {
  count: number;
  collection: GroupEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.GroupsList.map((d:GroupEntity) => new GroupEntity(d));
  }
}

export default GroupResponseList;