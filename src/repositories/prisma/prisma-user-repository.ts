import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateUserRepository } from '../create-user-repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements CreateUserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { name, email, password },
    });
  }
}
