import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Coordinates {
  @Field(() => ID)
  id: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string
}