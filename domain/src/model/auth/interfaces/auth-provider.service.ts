import {
  TChangePasswordCommand,
  TConfirmForgotPasswordCommand,
  TConfirmSignUpCommand,
  TForgotPasswordCommand,
  TLoginUserCommand,
  TResendConfirmationCodeCommand,
  TSignupUserCommand,
} from '../command/auth-provider.command';

export interface IAuthProviderService {
  getUserCommand(accessToken: string): Promise<any>;
  signInCommand(data: TLoginUserCommand): Promise<any>;
  confirmSignUpCommand(data: TConfirmSignUpCommand): Promise<any>;
  signUpCommand(data: TSignupUserCommand): Promise<any>;
  resendConfirmationCodeCommand(
    data: TResendConfirmationCodeCommand,
  ): Promise<any>;
  forgotPasswordCommand(data: TForgotPasswordCommand): Promise<any>;
  confirmForgotPasswordCommand(
    data: TConfirmForgotPasswordCommand,
  ): Promise<any>;
  changePasswordCommand(data: TChangePasswordCommand): Promise<any>;
}
