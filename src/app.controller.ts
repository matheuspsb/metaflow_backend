import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateNewUserBody } from './dtos/create-new-user-body';
import { User } from 'generated/prisma/client';
import { CreateUserRepository } from './repositories/create-user-repository';

@Controller()
export class AppController {
  constructor(private createUserRepository: CreateUserRepository) {}

  @Post('users')
  async createUser(@Body() body: CreateNewUserBody): Promise<User> {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.createUserRepository.createUser(name, email, hashedPassword);
  }
}
