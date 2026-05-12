import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { User } from 'generated/prisma/client';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('users')
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<User> {
    const { name, email, password } = body;

    const users = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return users;
  }
}
