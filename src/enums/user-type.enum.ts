import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN = 'ADMIN',
  APP_USER = 'APP_USER',
}

registerEnumType(UserType, {
  name: 'UserType', // this one is mandatory
  description: 'The types of users', // this one is optional
});