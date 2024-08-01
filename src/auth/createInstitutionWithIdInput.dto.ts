import { InputType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateInstitutionWithIdInput {
    @Field(() => ID)
    @IsNotEmpty()
    @IsMongoId()
    id: string;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    institutionName: string;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    slug: string;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    passCode: string;
  
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    logo?: string;
  
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    schoolColor?: string;
}
