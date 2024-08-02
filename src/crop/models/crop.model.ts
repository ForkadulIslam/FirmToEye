// src/crop/models/crop.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Variety } from './variety.model';

@ObjectType()
export class Crop {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [Variety])
  varieties: Variety[];
}
