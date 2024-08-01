import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthDto {
  @Field()
  accessToken: string;
}

@ObjectType()
export class SessionDto {
  @Field()
  token: string;

  @Field()
  deviceModel: string;

  @Field()
  valid: boolean;

  @Field()
  started: Date;

  @Field()
  lastSeen: Date;
}
