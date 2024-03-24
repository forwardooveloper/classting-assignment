import 'dotenv/config';

import {
  BillingMode,
  CreateTableCommand,
  CreateTableCommandInput,
  DescribeTableCommand,
  DynamoDBClient,
  KeyType,
  ScalarAttributeType,
  TableClass,
  waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';

const TableName = process.env.DYNAMODB_TABLE_NAME ?? 'Classting';

export const MessageTableCreateInput: CreateTableCommandInput = {
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: ScalarAttributeType.S,
    },
    {
      AttributeName: 'SK',
      AttributeType: ScalarAttributeType.S,
    },
    {
      AttributeName: 'createdAt',
      AttributeType: ScalarAttributeType.N,
    },
  ],
  TableName,
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: KeyType.HASH,
    },
    {
      AttributeName: 'SK',
      KeyType: KeyType.RANGE,
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'CreatedAtSort',
      KeySchema: [
        { AttributeName: 'PK', KeyType: KeyType.HASH },
        { AttributeName: 'createdAt', KeyType: KeyType.RANGE },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
  BillingMode: BillingMode.PAY_PER_REQUEST,
  TableClass: TableClass.STANDARD,
};

(async () => {
  const client = new DynamoDBClient({
    region: 'ap-northeast-2',
    endpoint: process.env.DYNAMODB_ENDPOINT_URL ?? 'http://localhost:8000',
  });

  try {
    await client.send(new DescribeTableCommand({ TableName }));
    console.log('Table already exists');
    return;
  } catch (error) {
    console.log('No tables created. Table creation progress..');
  }

  try {
    await client.send(new CreateTableCommand(MessageTableCreateInput));
    console.log(`${TableName} creating...`);

    await waitUntilTableExists(
      {
        client,
        maxWaitTime: 100,
      },
      { TableName },
    );
    console.log(`${TableName} create completed`);
  } catch (e) {
    console.log('create table failed', e);
  }
})();
