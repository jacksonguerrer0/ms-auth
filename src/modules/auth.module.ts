import { Module } from "@nestjs/common";
import { AuthController } from "src/adapters/in/http/auth/auth.controller";
import { UsersCognitoService } from "src/adapters/out/cognito/users-cognito.service";
import { dynamoDBDocumentClient } from "src/adapters/out/dynamo/client";
import { UsersDynamoService } from "src/adapters/out/dynamo/users-dynamo.service";

@Module({
  controllers: [AuthController],
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
export class AuthModule {}