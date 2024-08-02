// src/crop/dto/update-crop.dto.ts
import { IsString, IsArray, ValidateNested, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
class UpdateVarietyDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  varietyId?: string;
}

@InputType()
export class UpdateCropDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => [UpdateVarietyDto], { nullable: 'itemsAndList' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateVarietyDto)
  varieties?: UpdateVarietyDto[];
}
