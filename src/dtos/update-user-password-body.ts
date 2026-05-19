import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordBody {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;
}
