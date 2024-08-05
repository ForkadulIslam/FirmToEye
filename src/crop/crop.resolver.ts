// src/crop/crop.resolver.ts
import { Resolver, Mutation, Args, Query, ID, Context } from '@nestjs/graphql';
import { CropService } from './crop.service';
import { CreateCropDto, CreateVarietyDto } from './dto/create-crop.dto';
import { Crop } from './models/crop.model';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Variety } from './models/variety.model';

@Resolver(() => Crop)
export class CropResolver {
  constructor(private readonly cropService: CropService) {}

  @Mutation(() => Crop)
  async createCrop(@Args('data') data: CreateCropDto) {
    return this.cropService.createCrop(data);
  }

  @Query(() => [Crop])
  async getAllCrops() {
    return this.cropService.findAllCrops();
  }

  @Mutation(() => Crop)
  async updateCrop(@Args('data') data: UpdateCropDto) {
    return this.cropService.updateCrop(data);
  }

  @Query(() => Crop, { nullable: true })
  async getCrop(@Args('id', { type: () => ID }) id: string) {
    return this.cropService.getCropById(id);
  }

  @Mutation(() => Crop)
  async deleteCrop(@Args('id', { type: () => ID }) id: string) {
    return this.cropService.deleteCrop(id);
  }

  @Mutation(() => Variety)
  async deleteVariety(@Args('id', { type: () => ID }) id: string) {
    return this.cropService.deleteVariety(id);
  }

  @Mutation(() => Variety)
  async createVariety(@Args('data') data: CreateVarietyDto, cropid:string) {
    return this.cropService.createVariety (data, cropid);
  }
  @Query(() => Boolean)
  async gettest( @Context() abc:any) {
    console.log("qwertyu", abc.rollnumber)
    return true;
  }
}
