import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateNewUserBody } from 'src/dtos/create-new-user-body';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateNewUserBody): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
