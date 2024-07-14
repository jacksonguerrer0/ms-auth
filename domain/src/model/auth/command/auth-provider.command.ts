export type TSignupUserCommand = {
  username: string;
  email: string;
  password: string;
};

export type TLoginUserCommand = {
  username: string;
  password: string;
};

export type TConfirmSignUpCommand = {
  username: string;
  confirmationCode: string;
};

export type TResendConfirmationCodeCommand = {
  username: string;
};

export type TForgotPasswordCommand = {
  username: string;
};

export type TConfirmForgotPasswordCommand = {
  username: string;
  confirmationCode: string;
  newPassword: string;
};

export type TChangePasswordCommand = {
  accessToken: string;
  oldPassword: string;
  newPassword: string;
};
