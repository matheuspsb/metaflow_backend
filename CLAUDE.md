# Metaflow Backend

NestJS REST API with Prisma ORM and PostgreSQL.

## Stack

- **Framework**: NestJS
- **ORM**: Prisma 7 (driver adapter: `@prisma/adapter-pg`)
- **Database**: PostgreSQL
- **Language**: TypeScript

## Project Structure

```
src/
  app.module.ts         # Root module
  app.controller.ts     # Root controller (temporary, for testing)
  app.service.ts        # Root service (temporary, for testing)
  main.ts               # Entry point
  database/
    prisma.service.ts   # PrismaService (extends PrismaClient)

prisma/
  schema.prisma         # Database schema and models
  migrations/           # Migration history — always commit these

generated/
  prisma/               # Auto-generated Prisma client — DO NOT commit (in .gitignore)

prisma.config.ts        # Prisma 7 config (reads DATABASE_URL from .env)
```

## NestJS Rules to Follow

- One module per feature (e.g. `users/`, `auth/`, `products/`)
- Each feature module contains: `*.module.ts`, `*.controller.ts`, `*.service.ts`
- Use DTOs for request/response validation (with `class-validator`)
- Inject `PrismaService` via constructor injection — never instantiate it directly
- Controllers handle HTTP only — business logic lives in services
- Use NestJS built-in pipes (`ValidationPipe`) globally in `main.ts`
- Export only what other modules need — keep modules encapsulated

## Prisma

- Generated client is at `generated/prisma/client` (root level, outside `src/`)
- Import from `'generated/prisma/client'`
- `PrismaService` uses `@prisma/adapter-pg` for the PostgreSQL driver connection
- Run `npx prisma generate` after any schema change
- Run `npx prisma migrate dev --name <name>` to create and apply migrations
- Never edit migration files manually

## Database Models

### User
| Field | Type | Notes |
|---|---|---|
| id | String (UUID) | Primary key |
| name | String | |
| email | String | Unique |
| password | String | Store hashed only |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

## Environment

- `DATABASE_URL` — PostgreSQL connection string (in `.env`, never commit)
