import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './config/env.validation';
import { UsersCognitoService } from 'src/adapters/out/cognito/users-cognito.service';
import { UsersDynamoService } from 'src/adapters/out/dynamo/users-dynamo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvVariables,
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    UsersCognitoService,
    UsersDynamoService,
    {
      provide: UsersDynamoService,
      useFactory(dynamoDBDocumentClient) {
        return new UsersDynamoService(dynamoDBDocumentClient);
      },
      inject: ['dynamoClient'],
    },
  ],
})
export class CommonsModule {}
