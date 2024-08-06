import { Module } from '@nestjs/common';
import { CropFieldService } from './cropfield.service';
import { CropFieldResolver } from './cropfield.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports:[SharedModule],
    providers: [CropFieldService, CropFieldResolver],
})
export class CropFieldModule {}