import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateNewUserBody } from './dtos/create-new-user-body';
import { PrismaService } from './database/prisma.service';
import { User } from 'generated/prisma/client';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('users')
  async createUser(@Body() body: CreateNewUserBody): Promise<User> {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
