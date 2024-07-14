import { Module } from '@nestjs/common';
import { GetUserOfAuthProvider } from 'domain/src/services/auth/get-user-of-auth-provider.service';
import { SaveUserUsecase } from 'domain/src/usecase/auth/save-user.usecase';
import { AuthController } from 'src/adapters/in/http/auth/auth.controller';
import { HandlerSaveUser } from 'src/handler/auth/save-user.handler';

@Module({
  providers: [
    HandlerSaveUser,
    SaveUserUsecase,
    GetUserOfAuthProvider,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
