import { DeleteTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

(async () => {
  const TableName = process.env.DYNAMODB_TABLE_NAME;
  if (!TableName) {
    console.error('table name is require');
    process.exit(1);
  }

  const client = new DynamoDBClient({
    region: 'ap-northeast-2',
    endpoint: process.env.DYNAMODB_ENDPOINT_URL ?? 'http://localhost:8000',
  });

  try {
    await client.send(
      new DeleteTableCommand({
        TableName,
      }),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
