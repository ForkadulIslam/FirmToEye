import { IsString, IsArray, ValidateNested, ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCoordinateDto {
  @Field()
  latitude: string;

  @Field()
  longitude: string;
}

@InputType()
export class CreateCropFieldDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'CropField title should not be empty' })
  title: string;

  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'CropField title should not be empty' })
  cropId: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'CropField title should not be empty' })
  varietyId: string;


  @Field(() => [CreateCoordinateDto])
  @IsArray()
  @ArrayNotEmpty({ message: 'Varieties array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => CreateCoordinateDto)
  coordinates: { latitude: number; longitude: number }[];;
}