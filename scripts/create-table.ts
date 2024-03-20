import {
  BillingMode,
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDBClient,
  KeyType,
  ResourceInUseException,
  ScalarAttributeType,
  TableClass,
  waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';

const TableName = 'Classting-v2';

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
    endpoint: 'http://localhost:8000',
  });
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
    console.log(e);
    if (e instanceof ResourceInUseException) {
      console.log(`${TableName} already exists`);
    }
  }
})();
