import { Resolver, Mutation, Args, Query, ID, Context } from '@nestjs/graphql';
import { CropFieldService } from './cropfield.service';
import { CreateCoordinateDto, CreateCropFieldDto } from './dto/create-cropfield.dto';
import { Cropfield } from './models/cropfield.model';
// import { UpdateCropDto } from './dto/update-crop.dto';
import { Coordinates } from './models/coordinates.model';

@Resolver(() => Cropfield)
export class CropFieldResolver {
  constructor(private readonly cropService: CropFieldService) {}

  // @Mutation(() => Cropfield)
  // async createCrop(@Args('data') data: CreateCropFieldDto) {
  //   return this.cropService.createCrop(data);
  // }

  @Query(() => [Cropfield])
  async getAllCrops() {
    return this.cropService.findAllCrops();
  }
}