// src/crop/crop.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCropFieldDto, CreateCoordinateDto} from './dto/create-cropfield.dto';
// import { UpdateCropDto } from './dto/update-crop.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CropFieldService {
  findAllCrops() {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

//   async createCrop(data: CreateCropFieldDto) {
//     const { title, userId, cropId, varietyId, coordinates } = data;

//     try {
//       const cropField = await this.prisma.cropField.create({
//         data: {
//           title,
//           userId,
//           cropId,
//           varietyId,
//           coordinates: coordinates.map((coord) => ({
//             latitude: coord.latitude, 
//             longitude: coord.longitude, 
//           })),
//         },
//         include: {
//           coordinates: true, // This might not be necessary if coordinates are embedded
//         },
//       });

//       return cropField;
//     } catch (error) {
//       // Handle error appropriately
//       throw new Error('Error creating crop field: ' + error.message);
//     }
//   }



  async findAllCropfields() {
    return this.prisma.cropField.findMany({
      include: {
        Cordinates: true,
      },
    });
  }

}