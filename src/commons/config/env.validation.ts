import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';
import { AppEnv } from 'src/model/enums/env.enum';

class EnvVariables {
  @IsEnum(AppEnv)
  APP_ENV!: string;

  @IsString()
  AWS_REGION!: string;

  @IsString()
  AWS_COGNITO_CLIENT_ID!: string;

  @IsString()
  AWS_COGNITO_ENDPOINT_LOCAL!: string;

  @IsString()
  AWS_DYNAMO_ENDPOINT_URL!: string;

  @IsString()
  AWS_DYNAMO_USERS_TABLE!: string;
}

export function validateEnvVariables(config: Record<string, unknown>) {
  const validateConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Environment variable validation failed: ${JSON.stringify(errors)}`,
    );
  }

  return validateConfig;
}
