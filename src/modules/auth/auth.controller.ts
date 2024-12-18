import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser';
import { LoginUserDto } from 'src/dtos/loginUserDto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async singUp(@Body() UserDto: CreateUserDto) {
    const { password, confirmPassword } = UserDto;
    if (password != confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    const newUser = await this.authService.signUp(UserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = newUser;
    return { user: rest };
  }

  @Post('signin')
  singIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
