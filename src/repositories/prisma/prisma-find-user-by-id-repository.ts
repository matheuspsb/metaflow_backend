import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { FindUserByIdRepository } from '../find-user-by-id-repository';

@Injectable()
export class PrismaFindUserByIdRepository implements FindUserByIdRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
