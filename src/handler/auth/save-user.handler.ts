import { Inject, Injectable } from '@nestjs/common';
import { SaveUserMapper } from 'domain/src/model/auth/mapper/save-user.mapper';
import { SaveUserUsecase } from 'domain/src/usecase/auth/save-user.usecase';
import { TypeUserDTO } from 'src/model/dtos/auth/users.dto';

@Injectable()
export class HandlerSaveUser {
  constructor(
    //@Inject(SaveUserMapper)
    //private readonly saveUserMapper: SaveUserMapper,
    @Inject(SaveUserUsecase)
    private readonly saveUserUsecase: SaveUserUsecase,
  ) {}

  async execute(accessToken: string) {
    //const command = this.saveUserMapper.toModel(request, type);
    this.saveUserUsecase.apply(accessToken);
  }
}
