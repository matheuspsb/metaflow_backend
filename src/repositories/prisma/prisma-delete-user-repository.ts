import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { DeleteUserRepository } from '../delete-user-repository';

@Injectable()
export class PrismaDeleteUserRepository implements DeleteUserRepository {
  constructor(private prisma: PrismaService) {}

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
