import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNewUserBody {
  @IsString()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty({
    message: 'Password is required',
  })
  password!: string;
}
