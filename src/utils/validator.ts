import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UuidIdDto } from '@src/interfaces/configuration';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationService {
  static async validateUuid(id: string | undefined): Promise<void> {
    const uuidIdDto = plainToInstance(UuidIdDto, { id });

    try {
      await validateOrReject(uuidIdDto);
    } catch (errors) {
      throw new HttpException('Validation failed, must be a UUID', HttpStatus.BAD_REQUEST);
    }
  }
}
