import { Module } from '@nestjs/common';
import { Dynamodb } from './dynamodb';
import { DYNAMODB } from './symbol/dynamodb-manager.symbol';

@Module({
  providers: [
    {
      provide: DYNAMODB,
      useClass: Dynamodb,
    },
  ],
  exports: [DYNAMODB],
})
export class DynamodbModule {}
