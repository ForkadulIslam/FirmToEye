// src/crop/models/variety.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Variety {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  @IsOptional()
  varietyId?: string
}
