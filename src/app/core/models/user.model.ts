export class User {
  constructor(
    public token: string,
    public _id: string,
    public username: string,
    public twitter: string,
    public profile: string,
    public email: string,
    public role: string,
    public exp: Date
  ) { }
}