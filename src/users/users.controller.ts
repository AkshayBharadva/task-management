import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signin(createUserDto);
  }
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }
  @Get('/profile')
  getProfile(@Request() req) {
    return req.headers;
  }
}
