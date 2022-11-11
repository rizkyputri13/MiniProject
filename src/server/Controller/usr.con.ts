import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Next,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../Services/usr.srv';

@Controller()
export class UserController {
  constructor(private authService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  public async signup(@Body() fields: any) {
    return this.authService.signup(fields);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
