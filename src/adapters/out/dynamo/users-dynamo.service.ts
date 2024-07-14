import { ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersEntity } from 'domain/src/model/auth/entities/users.entity';
import { getCurrentDate } from 'src/commons/utils/time.utils';

const { AWS_DYNAMO_USERS_TABLE } = process.env;
@Injectable()
export class UsersDynamoService {
  constructor(
    @Inject(DynamoDBDocumentClient)
    private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
  ) {}

  async create(entity: UsersEntity) {
    try {
      const currentDate = getCurrentDate();
      const params: PutCommandInput = {
        TableName: AWS_DYNAMO_USERS_TABLE,
        Item: {
          ...entity,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      };
      return await this.dynamoDBDocumentClient.send(new PutCommand(params));
    } catch (error) {
      console.error('Error creating user in dynamoDB', error);
      throw new InternalServerErrorException('Error');
    }
  }

  async getByPKAndSK(PK: string, SK: string) {
    try {
      const params: QueryCommandInput = {
        TableName: AWS_DYNAMO_USERS_TABLE,
        KeyConditionExpression: '#PK = :PK and #SK = :SK',
        ExpressionAttributeNames: {
          '#PK': 'PK',
          '#SK': 'SK',
        },
        ExpressionAttributeValues: {
          ':PK': PK,
          ':SK': SK,
        },
      };

      return await this.dynamoDBDocumentClient.send(new QueryCommand(params));
    } catch (error) {
      console.log('Error getting user by PK and SK in dynamoDB');
      throw new InternalServerErrorException('Error');
    }
  }

  async getAllWithLimit(Limit: number) {
    try {
      const params: ScanCommandInput = {
        TableName: AWS_DYNAMO_USERS_TABLE,
        Limit,
      };

      return await this.dynamoDBDocumentClient.send(new ScanCommand(params));
    } catch (error) {
      console.error('Error getting all users in dynamoDB', error);
      throw new InternalServerErrorException('Error');
    }
  }
}
