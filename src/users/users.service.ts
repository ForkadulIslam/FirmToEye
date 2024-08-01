// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async create(inputData: { email: string; password: string }) {
    const  data =  {
      userType:UserType.ADMIN,
      userName:"Demo",
      email: inputData.email,
      phone:"01737064777",
      password: inputData.password,
    };
    return this.prisma.user.create({ data });
  }
}
