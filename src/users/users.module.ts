import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserRepository } from 'src/repositories/create-user-repository';
import { DeleteUserRepository } from 'src/repositories/delete-user-repository';
import { FindUserByIdRepository } from 'src/repositories/find-user-by-id-repository';
import { UpdateUserPasswordRepository } from 'src/repositories/update-user-password-repository';
import { FetchAllUsersRepository } from 'src/repositories/fetch-all-users-repository';
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaDeleteUserRepository } from 'src/repositories/prisma/prisma-delete-user-repository';
import { PrismaFindUserByIdRepository } from 'src/repositories/prisma/prisma-find-user-by-id-repository';
import { PrismaUpdateUserPasswordRepository } from 'src/repositories/prisma/prisma-update-user-password-repository';
import { PrismaFetchAllUsersRepository } from 'src/repositories/prisma/prisma-fetch-all-users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: CreateUserRepository, useClass: PrismaUserRepository },
    { provide: DeleteUserRepository, useClass: PrismaDeleteUserRepository },
    { provide: FindUserByIdRepository, useClass: PrismaFindUserByIdRepository },
    {
      provide: UpdateUserPasswordRepository,
      useClass: PrismaUpdateUserPasswordRepository,
    },
    {
      provide: FetchAllUsersRepository,
      useClass: PrismaFetchAllUsersRepository,
    },
  ],
})
export class UsersModule {}
