import { IAuthProviderService } from "domain/src/model/auth/interfaces/auth-provider.service";

export class GetUserOfAuthProvider {
  constructor(
    private readonly authProvider: IAuthProviderService,
  ) {}

  async apply(accessToken: string): Promise<any> {
    const user = await this.authProvider.getUserCommand(accessToken);
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}