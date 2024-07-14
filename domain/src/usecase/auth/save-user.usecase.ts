import { SaveUserCommand } from 'domain/src/model/auth/command/save-user.command';
import { GetUserOfAuthProvider } from 'domain/src/services/auth/get-user-of-auth-provider.service';

export class SaveUserUsecase {
  constructor(
    private readonly getUserOfAuthProvider: GetUserOfAuthProvider,
  ) {}

  async apply(command: string) {
    this.getUserOfAuthProvider.apply(command);
    // ibtener usuario por uuid  cognito
    // recibir informacion extra a almacenar en dynamo
    // save in dynamo
    // maper to save in dynamo
  }
}
