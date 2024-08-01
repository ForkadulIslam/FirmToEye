import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserRegistrationDto {
  
  @Field()
  @IsNotEmpty()
  userName: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsNotEmpty()
  password: string;

}
