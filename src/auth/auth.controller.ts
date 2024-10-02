import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegsisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  register( @Body() registerDto: RegsisterDto){
    console.log(registerDto)
    return this.authService.register(registerDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  
}
