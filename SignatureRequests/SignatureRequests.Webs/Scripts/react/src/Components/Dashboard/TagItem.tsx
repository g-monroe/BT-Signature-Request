export default class TagItem{
    color:string;
    backgroundColor:string;
    text:string;
    date: Date;
    constructor(color:string, backgroundColor:string, text:string, date:Date){
      this.color = color;
      this.backgroundColor = backgroundColor;
      this.text = text;
      this.date = date;
    }
  }