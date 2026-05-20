import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { FetchAllUsersRepository } from '../fetch-all-users-repository';

@Injectable()
export class PrismaFetchAllUsersRepository implements FetchAllUsersRepository {
  constructor(private prisma: PrismaService) {}

  async fetchAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
