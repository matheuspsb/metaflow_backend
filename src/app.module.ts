import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CreateUserRepository } from './repositories/create-user-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: CreateUserRepository, useClass: PrismaUserRepository },
  ],
})
export class AppModule {}
