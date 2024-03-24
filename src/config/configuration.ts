export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  dynamodb: {
    region: process.env.DYNAMODB_REGION || 'ap-northeast-2',
    tableName: process.env.DYNAMODB_TABLE_NAME || 'Classting',
    endpoint: process.env.DYNAMODB_ENDPOINT_URL || 'http://localhost:8000',
  },
});
