import {
  DeleteCommandInput,
  DeleteCommandOutput,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
  UpdateCommandInput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';

export interface DynamodbInterface {
  putItem(param: PutCommandInput): Promise<PutCommandOutput>;
  updateItem(param: UpdateCommandInput): Promise<UpdateCommandOutput>;
  getItem(param: GetCommandInput): Promise<GetCommandOutput>;
  deleteItem(param: DeleteCommandInput): Promise<DeleteCommandOutput>;
  queryItems(param: QueryCommandInput): Promise<QueryCommandOutput>;
}
