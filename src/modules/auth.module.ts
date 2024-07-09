import { Module } from "@nestjs/common";
import { AuthController } from "src/adapters/in/http/auth/auth.controller";

@Module({
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}