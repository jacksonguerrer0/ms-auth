import { ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersCognitoService } from 'src/adapters/out/cognito/users-cognito.service';
import { UsersDynamoService } from 'src/adapters/out/dynamo/users-dynamo.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersCognitoService)
    private readonly usersCognitoService: UsersCognitoService,
    @Inject(UsersDynamoService)
    private readonly usersDynamoService: UsersDynamoService,
  ) {}

  @Post('/login')
  async login(): Promise<void> {}

  @Post('/signup')
  async signup(): Promise<void> {}

  @Post('/confirm-code')
  async confirmCode(): Promise<void> {}

  @Get('/user')
  async get_user(): Promise<ScanCommandOutput | string> {
    const result1 = await this.usersDynamoService.create({PK: 'demoPK2', SK: 'demoSK', username: 'DEMOUSERNAME', email: 'email', uuid: 'uuid', createdAt: 'demo', updatedAt: 'demo'})
    const result = await this.usersDynamoService.getAllWithLimit(10);
    const result2 = await this.usersDynamoService.getByPKAndSK('demoPK2', 'demoSK');
    return result2;
  }
}
