import { Controller, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandlerSaveUser } from 'src/handler/auth/save-user.handler';
import { AuthPayloadDTO, TypeUserDTO } from 'src/model/dtos/auth/users.dto';

@ApiTags('Auth')
//@UseGuards(CognitoAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(HandlerSaveUser)
    private readonly handlerSaveUser: HandlerSaveUser,
  ) {}

  @Post('/login')
  async login(): Promise<void> {}

  @Post('/confirm-code')
  async confirmCode(): Promise<void> {}

  @Post('/user/:type')
  async persist_user(
    @Req() request: any,
    @Param() params: TypeUserDTO,
  ): Promise<void> {
    const authorizationHeader = request.headers.authorization;
    const accessToken =
      authorizationHeader && authorizationHeader.split(' ')[1];
    return this.handlerSaveUser.execute(accessToken);
  }

  @Get('/validate/:type')
  async validate_user(@Req() request): Promise<void> {
    console.log(request);
  }
}
