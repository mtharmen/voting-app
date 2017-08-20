export class Poll {
  constructor(
    public _id: string,
    public title: string,
    public owner: string,
    public labels: string[],
    public data: number[]
  ) { }
}
