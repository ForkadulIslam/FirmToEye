import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './user.resolver';
import { CropModule } from './crop/crop.module';
import { CropFieldModule } from './cropfield/cropfield.module';
// import {extractBearerToken} from './auth/guards/gql-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      // context: ({ raw }) => {
      //   return { authToken: extractBearerToken(raw.headers) };
      // },
    }),
    SharedModule,
    AuthModule,
    CropModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserResolver], // Register the resolver here
})
export class AppModule {}
