import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
@Injectable()
export class IsDateArrayDecorator implements ValidatorConstraintInterface {
  validate(array: string[]) {
    return !array.some(
      (i) =>
        !i.match(
          /^(19|20)[0-9]{2}([-])(0[1-9]|1[0-2])([-])(0[1-9]|1[0-9]|2[0-9]|3[0,1])$/,
        ),
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' date format must be YYYY-MM-DD';
  }
}

export function IsDateArray(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDateArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsDateArrayDecorator,
    });
  };
}
