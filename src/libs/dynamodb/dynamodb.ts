import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  PutCommandInput,
  PutCommandOutput,
  GetCommandInput,
  GetCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
  UpdateCommand,
  UpdateCommandInput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { DynamodbInterface } from './dynamodb.interface';

@Injectable()
export class Dynamodb implements DynamodbInterface {
  constructor() {}

  private getDynamodbClient(): DynamoDBClient {
    return new DynamoDBClient({
      region: 'ap-northeast-2',
      endpoint: 'http://localhost:8000',
    });
  }

  async putItem(param: PutCommandInput): Promise<PutCommandOutput> {
    const client = this.getDynamodbClient();

    return await client.send(new PutCommand(param));
  }

  async updateItem(param: UpdateCommandInput): Promise<UpdateCommandOutput> {
    const client = this.getDynamodbClient();

    return await client.send(new UpdateCommand(param));
  }

  async getItem(param: GetCommandInput): Promise<GetCommandOutput> {
    const client = this.getDynamodbClient();

    return await client.send(new GetCommand(param));
  }

  async deleteItem(param: DeleteCommandInput): Promise<DeleteCommandOutput> {
    const client = this.getDynamodbClient();

    return await client.send(new DeleteCommand(param));
  }

  async queryItems(param: QueryCommandInput): Promise<QueryCommandOutput> {
    const client = this.getDynamodbClient();

    return await client.send(new QueryCommand(param));
  }
}
