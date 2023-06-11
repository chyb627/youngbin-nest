import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signupDto: SignupDto) {
    const result = this.authService.signUp(signupDto);
    // console.log(result);
    return result;
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signinDto: SigninDto) {
    const result = this.authService.signIn(signinDto);
    // console.log(result);
    return result;
  }

  @Post('jwttest')
  @UseGuards(AuthGuard())
  jwtTest(@GetUser() user: User) {
    console.log('user:::', user);
  }
}
