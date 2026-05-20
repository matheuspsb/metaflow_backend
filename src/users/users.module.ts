import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/repositories/users-repository';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
})
export class UsersModule {}
