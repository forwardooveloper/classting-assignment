import {
  BillingMode,
  CreateTableCommand,
  DynamoDBClient,
  KeyType,
  ResourceInUseException,
  ScalarAttributeType,
  TableClass,
  waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';

const TableName = 'TestTable';

export const MessageTableCreateInput = {
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: ScalarAttributeType.S,
    },
    {
      AttributeName: 'SK',
      AttributeType: ScalarAttributeType.S,
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
    if (e instanceof ResourceInUseException) {
      console.log(`${TableName} already exists`);
    }
  }
})();
