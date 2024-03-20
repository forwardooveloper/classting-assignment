import {
  DeleteCommandInput,
  DeleteCommandOutput,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
} from '@aws-sdk/lib-dynamodb';

export interface DynamodbInterface {
  putItem(param: PutCommandInput): Promise<PutCommandOutput>;
  getItem(param: GetCommandInput): Promise<GetCommandOutput>;
  deleteItem(param: DeleteCommandInput): Promise<DeleteCommandOutput>;
  queryItems(param: QueryCommandInput): Promise<QueryCommandOutput>;
}
