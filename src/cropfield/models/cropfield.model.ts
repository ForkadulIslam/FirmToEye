import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Coordinates } from './coordinates.model';

@ObjectType()
export class Cropfield {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  userId :String   

  @Field()
  cropId: String  

  @Field()
  varietyId : String
  
  @Field()
  coordinates :Coordinates[]
}

