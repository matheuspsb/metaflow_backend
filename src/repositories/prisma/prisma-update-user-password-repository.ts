import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserPasswordRepository } from '../update-user-password-repository';

@Injectable()
export class PrismaUpdateUserPasswordRepository implements UpdateUserPasswordRepository {
  constructor(private prisma: PrismaService) {}

  async updatePassword(id: string, hashedPassword: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
