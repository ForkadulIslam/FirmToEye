// src/crop/crop.module.ts
import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropResolver } from './crop.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports:[SharedModule],
    providers: [CropService, CropResolver],
})
export class CropModule {}
