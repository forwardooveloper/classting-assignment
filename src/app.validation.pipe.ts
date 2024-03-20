import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true,
    });

    const errors = await validate(object);

    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException(
        `invalid request parameters. key: ${errors
          .map((error) => error.property)
          .join(', ')}`,
      );
    }

    return value;
  }
}
