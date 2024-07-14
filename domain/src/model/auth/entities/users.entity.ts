export class UsersEntity {
  constructor(
    public PK: string,
    public SK: string,
    public email: string,
    public username: string,
    public uuid: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
