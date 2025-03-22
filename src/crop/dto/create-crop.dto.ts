// src/crop/dto/create-crop.dto.ts
import { IsString, IsArray, ValidateNested, ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVarietyDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Variety title should not be empty' })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  varietyId?: string;
}

@InputType()
export class CreateCropDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Crop title should not be empty' })
  title: string;

  @Field(() => [CreateVarietyDto])
  @IsArray()
  @ArrayNotEmpty({ message: 'Varieties array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => CreateVarietyDto)
  varieties: CreateVarietyDto[];
}
