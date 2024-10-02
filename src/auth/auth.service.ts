import { BadRequestException, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegsisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async register({name, email, password}: RegsisterDto) {
    console.log('a')
    const user = await this.userService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('User alredy exists')
    }

    console.log({name, email, password})
    return await this.userService.create({
      name, 
      email, 
      password: await bcrypt.hash(password, 10)
    })
  }

  @Post('login')
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedException('email is wrong')
    }

    const pass = await bcrypt.compare(loginDto.password, user.password)
    if (!pass) {
      throw new UnauthorizedException('password is wrong')
    }

    const payload = {email: user.email}

    const token = await this.jwtService.signAsync(payload)
    const email = loginDto.email
    return {
      token,
      email
    };
  }

}
