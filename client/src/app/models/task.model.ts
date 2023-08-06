export default class Task{
    constructor(
        public id:string = "0",
        public title:string = "",
        public description:string = "",
        public priority:number = 1,
        public isdone:boolean = false,
        public createddate:Date = new Date(),
        public expireddate:Date = new Date(),
        public comments: string[] = [""] ){}
}