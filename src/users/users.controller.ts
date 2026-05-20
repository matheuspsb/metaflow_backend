import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateNewUserBody } from 'src/dtos/create-new-user-body';
import { UpdateUserPasswordBody } from 'src/dtos/update-user-password-body';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  fetchAllUsers(): Promise<User[]> {
    return this.usersService.fetchAllUsers();
  }

  @Post()
  createUser(@Body() body: CreateNewUserBody): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() body: UpdateUserPasswordBody,
  ): Promise<User> {
    return this.usersService.updatePassword(id, body);
  }
}
