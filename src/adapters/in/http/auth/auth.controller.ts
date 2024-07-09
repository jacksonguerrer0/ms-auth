import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/login')
  async login(): Promise<void> {}

  @Post('/signup')
  async signup(): Promise<void> {}

  @Post('/confirm-code')
  async confirmCode(): Promise<void> {}

  @Get('/user')
  async get_user(): Promise<string> {
    return 'Hello World';
  }
}
