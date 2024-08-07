// src/auth/auth.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { UserRegistrationDto } from './register.dto';
import { UserType } from '@prisma/client';
import { valid } from 'joi';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  

  async login(user: any): Promise<AuthDto> {
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1y' });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        sessions: {
          push: {
            token: accessToken,
            deviceModel: 'Web',
            valid: true,
            started: new Date(),
            lastSeen: new Date(),
          },
        },
      },
    });
    return { accessToken };
  }

  async registerUser(data: UserRegistrationDto): Promise<AuthDto> {
    let existingUserFlag = false;
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    const existingUserByPhone = await this.prisma.user.findUnique({
      where: { phone: data.phone },
    });
    if (existingUserByEmail || existingUserByPhone) {
      existingUserFlag = true;
    }

    if(existingUserFlag){
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        userType:UserType.APP_USER,
        userName: data.userName,
        phone: data.phone,
        password: hashedPassword,
        email: data.email,
      },
    });
    return this.login(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

}
