import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

interface ICognitoClient {
  region: string;
}

export const CognitoClient = ({ region }: ICognitoClient) =>
  new CognitoIdentityProviderClient({
    region,
    ...(process.env.APP_ENV === 'local' && {
      endpoint: process.env.AWS_COGNITO_ENDPOINT_LOCAL,
    }),
  });
