import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const { AWS_DYNAMO_ENDPOINT_URL, REGION } = process.env;

const dynamoDBClient = new DynamoDBClient({
  region: REGION,
  endpoint: AWS_DYNAMO_ENDPOINT_URL,
});

const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient, {
  marshallOptions: { removeUndefinedValues: true },
});

export { dynamoDBDocumentClient };
