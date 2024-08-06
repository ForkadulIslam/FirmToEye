// src/auth/auth.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, sendOtp } from './auth.dto';
import { UserRegistrationDto } from './register.dto';
import { PhoneVerification, UserType } from '@prisma/client';
import { valid } from 'joi';
import { randomInt } from 'crypto';


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

  async validateOtp(phone: string, otp: string): Promise<string> {
    const userVerification = await this.prisma.phoneVerification.findFirst({
      where: { phone: phone }
    });
    if (!userVerification) {
      throw new NotFoundException('No valid verification found for this phone number');
    }
    if (otp !== userVerification.verificationCode) {
      throw new UnauthorizedException('Invalid OTP');
    }
    if (userVerification.verificationExpiry < new Date()) {
      throw new UnauthorizedException('OTP has expired');
    }
    if (!userVerification.userId) {
      throw new NotFoundException('User not found');
    }
    return 'OTP verified successfully';
  }
  


  async sendOtp(inputData: { phone: string }) {
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  
    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Find or create the user
      let user = await prisma.user.findUnique({
        where: { phone: inputData.phone },
      });
  
      if (!user) {
        const tempUsername = `user_${Math.random().toString(36).substr(2, 9)}`;
        const tempEmail = `${tempUsername}@example.com`;
        const tempPassword = Math.random().toString(36).substr(2, 15);
  
        user = await prisma.user.create({
          data: {
            phone: inputData.phone,
            userName: tempUsername,
            email: tempEmail,
            password: tempPassword,
          },
        });
      }
  
      let phoneVerification = await prisma.phoneVerification.findUnique({
        where: { phone: inputData.phone },
      });
  
      if (phoneVerification) {
        // If the record exists, update it
        phoneVerification = await prisma.phoneVerification.update({
          where: { phone: inputData.phone },
          data: {
            verificationCode: generateSecureOTP(),
            verificationExpiry: verificationExpiry,
          },
          include: { user: true },
        });
      } else {
        phoneVerification = await prisma.phoneVerification.create({
          data: {
            phone: inputData.phone,
            verificationCode: generateSecureOTP(),
            verificationExpiry: verificationExpiry,
            user: {
              connect: { id: user.id }
            }
          },
          include: { user: true },
        });
      }
  
      return phoneVerification;
    });
  }
  
 
}
function generateSecureOTP() {
  const characters = '0123456789';
  let otp = '';

  for (let i = 0; i < 6; i++) {
      const randomIndex = randomInt(0, characters.length);
      otp += characters[randomIndex];
  }

  return otp;
}