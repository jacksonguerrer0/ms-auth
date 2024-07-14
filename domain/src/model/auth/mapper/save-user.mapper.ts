import { AuthPayloadDTO, TypeUserDTO } from 'src/model/dtos/auth/users.dto';
import { SaveUserCommand } from '../command/save-user.command';

export class SaveUserMapper {
  public toModel(request: AuthPayloadDTO, type: TypeUserDTO): SaveUserCommand {
    return {
      access_token: request.username,
    };
  }

  public toDTO(data: any): any {
    return data;
  }
}
