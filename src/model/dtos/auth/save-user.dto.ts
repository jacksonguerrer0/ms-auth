import { IsEmail, IsString } from 'class-validator';

export class SaveUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
