import { IsString } from 'class-validator';
import { TTypeUsers } from 'domain/src/model/auth/types/users.type';

export class TypeUserDTO {
  @IsString()
  type!: TTypeUsers;
}

export class AuthPayloadDTO {
  @IsString()
  username!: string;
}
