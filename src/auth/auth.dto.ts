import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

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

@InputType()
export class VerificationInputDto {
  @Field()
  phone: string;

  @Field()
  verificationCode: string;
}

@ObjectType()
export class VerificationOutputDto {
  @Field()
  phone: string;

  @Field()
  verificationCode: string;

  @Field()
  message: string;
}


@ObjectType()
export class sendOtp {
  @Field()
  phone: String;

}

@ObjectType()
export class dummylogin {
  @Field()
  name: String;

  @Field()
  password: String;

}
