import {
  ChangePasswordCommand,
  ChangePasswordCommandInput,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
  GetUserCommand,
  GetUserCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  TChangePasswordCommand,
  TConfirmForgotPasswordCommand,
  TConfirmSignUpCommand,
  TForgotPasswordCommand,
  TLoginUserCommand,
  TResendConfirmationCodeCommand,
  TSignupUserCommand,
} from 'domain/src/model/auth/command/auth-provider.command';
import { IAuthProviderService } from 'domain/src/model/auth/interfaces/auth-provider.service';
import { CognitoClient } from './client';

@Injectable()
export class UsersCognitoService implements IAuthProviderService {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly clientId: string;

  constructor() {
    this.cognitoClient = CognitoClient({
      region: process.env.AWS_REGION,
    });
    this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
  }

  async getUserCommand(accessToken: string) {
    try {
      const params: GetUserCommandInput = {
        AccessToken: accessToken,
      };

      return await this.cognitoClient.send(new GetUserCommand({ ...params }));
    } catch (error) {
      console.error(`signInCommand - ${error}`);
      throw new InternalServerErrorException('Error getting user');
    }
  }

  async signInCommand(data: TLoginUserCommand) {
    try {
      const { username, password } = data;

      const params: InitiateAuthCommandInput = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      };
      // TODO: Add mapper to return only the necessary data
      return await this.cognitoClient.send(
        new InitiateAuthCommand({ ...params }),
      );
    } catch (error) {
      console.error(`signInCommand - ${error}`);
      throw new InternalServerErrorException('Can not login');
    }
  }

  async confirmSignUpCommand(data: TConfirmSignUpCommand) {
    try {
      const { username, confirmationCode } = data;
      const params: ConfirmSignUpCommandInput = {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
      };

      await this.cognitoClient.send(new ConfirmSignUpCommand(params));
    } catch (error) {
      console.error(`confirmSignUpCommand - ${error}`);
      throw new InternalServerErrorException('Can not confirm signup');
    }
  }

  // SIGNUP will be used to create a new user as dependent of the principal user
  async signUpCommand(data: TSignupUserCommand) {
    try {
      const { username, email, password } = data;

      const params: SignUpCommandInput = {
        ClientId: this.clientId,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
          {
            Name: 'preferred_username',
            Value: username,
          },
        ],
      };

      await this.cognitoClient.send(new SignUpCommand(params));
    } catch (error) {
      console.error('signUpCommand - error:', error);
      throw new InternalServerErrorException('Not is posible create this user');
    }
  }

  // TODO: Use later :)
  async resendConfirmationCodeCommand(data: TResendConfirmationCodeCommand) {
    try {
      const { username } = data;
      const params: ResendConfirmationCodeCommandInput = {
        ClientId: this.clientId,
        Username: username,
      };

      await this.cognitoClient.send(new ResendConfirmationCodeCommand(params));
    } catch (error) {
      console.error(`resendConfirmationCodeCommand - ${error}`);
      throw new InternalServerErrorException(
        'Can not resend confirmation code',
      );
    }
  }

  async forgotPasswordCommand(data: TForgotPasswordCommand) {
    try {
      const { username } = data;
      const params: ForgotPasswordCommandInput = {
        ClientId: this.clientId,
        Username: username,
      };

      await this.cognitoClient.send(new ForgotPasswordCommand(params));
    } catch (error) {
      console.error(`forgotPasswordCommand - ${error}`);
      throw new InternalServerErrorException('Can not recover password');
    }
  }

  async confirmForgotPasswordCommand(data: TConfirmForgotPasswordCommand) {
    try {
      const { username, confirmationCode, newPassword } = data;
      const params: ConfirmForgotPasswordCommandInput = {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
      };

      await this.cognitoClient.send(new ConfirmForgotPasswordCommand(params));
    } catch (error) {
      console.error(`confirmForgotPasswordCommand - ${error}`);
      throw new InternalServerErrorException(
        'Can not confirm recover password',
      );
    }
  }

  async changePasswordCommand(data: TChangePasswordCommand) {
    try {
      const { accessToken, oldPassword, newPassword } = data;
      const params: ChangePasswordCommandInput = {
        AccessToken: accessToken,
        PreviousPassword: oldPassword,
        ProposedPassword: newPassword,
      };

      await this.cognitoClient.send(new ChangePasswordCommand(params));
    } catch (error) {
      console.error(`changePasswordCommand - ${error}`);
      throw new InternalServerErrorException('Can not change password');
    }
  }
}
