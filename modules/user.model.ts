export class User {
  map(arg0: (user: any) => any): any {
    throw new Error("Method not implemented.");
  }
  constructor(
    public email: string,

    public id: string,
    private _token: string,
    private _tokenExpDate: any,
    public displayName?: string
  ) {}

  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      return null;
    }
    return this._token;
  }
}
