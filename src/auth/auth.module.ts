// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { SharedModule } from 'src/shared/shared.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, LocalAuthGuard, AuthResolver],
  //providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, LocalAuthGuard],
  controllers: [],
})
export class AuthModule {}
