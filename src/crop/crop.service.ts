// src/crop/crop.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CropService {
  constructor(private readonly prisma: PrismaService) {}

  async createCrop(data: CreateCropDto) {
    const { title, varieties } = data;

    // Create crop and related varieties in a single transaction
    const crop = await this.prisma.crop.create({
      data: {
        title: title,
        varieties: {
          create: varieties.map((v) => ({
            title: v.title,
            varietyId: v.varietyId || '', // Assign varietyId if provided, otherwise default to an empty string or any default value
          })),
        },
      },
      include: {
        varieties: true,
      },
    });

    return crop;
  }

  async findAllCrops() {
    return this.prisma.crop.findMany({
      include: {
        varieties: true,
      },
    });
  }

  async updateCrop(data: UpdateCropDto) {
    const { id, title, varieties } = data;

    // Verify if the crop exists
    const existingCrop = await this.prisma.crop.findUnique({
      where: { id },
    });

    if (!existingCrop) {
      throw new NotFoundException('Crop not found');
    }

    // Update the crop and its varieties
    const updatedCrop = await this.prisma.crop.update({
      where: { id },
      data: {
        title: title || existingCrop.title,
        varieties: {
          updateMany: varieties?.map((v) => ({
            where: { id: v.id },
            data: {
              title: v.title,
              varietyId: v.varietyId || undefined,
            },
          })),
        },
      },
      include: {
        varieties: true,
      },
    });

    return updatedCrop;
  }

  async deleteCrop(cropId: string) {

    if (!ObjectId.isValid(cropId)) {
      throw new BadRequestException('Invalid crop ID format.');
    }

    // Check if the crop exists
    const crop = await this.prisma.crop.findUnique({
      where: { id: cropId },
    });

    if (!crop) {
      throw new NotFoundException('Crop not found');
    }

    // Delete the crop and its related varieties
    return this.prisma.crop.delete({
      where: { id: cropId },
    });
  }

  async getCropById(cropId: string) {
    const crop = await this.prisma.crop.findUnique({
      where: { id: cropId },
      include: {
        varieties: true,
      },
    });

    if (!crop) {
      throw new NotFoundException('Crop not found');
    }

    return crop;
  }

  async deleteVariety(varietyId: string) {
    // Validate if varietyId is a valid ObjectID
    if (!ObjectId.isValid(varietyId)) {
      throw new BadRequestException('Invalid variety ID format.');
    }

    // Check if the variety exists
    const variety = await this.prisma.variety.findUnique({
      where: { id: varietyId },
    });

    if (!variety) {
      throw new NotFoundException('Variety not found');
    }

    // Delete the variety
    return this.prisma.variety.delete({
      where: { id: varietyId },
    });
  }

}
