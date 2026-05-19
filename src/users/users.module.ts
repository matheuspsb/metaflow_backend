import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserRepository } from 'src/repositories/create-user-repository';
import { DeleteUserRepository } from 'src/repositories/delete-user-repository';
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaDeleteUserRepository } from 'src/repositories/prisma/prisma-delete-user-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: CreateUserRepository, useClass: PrismaUserRepository },
    { provide: DeleteUserRepository, useClass: PrismaDeleteUserRepository },
  ],
})
export class UsersModule {}
