import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';

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
}
