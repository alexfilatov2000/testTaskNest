import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserPublicAttributes } from '@src/users/users.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() { user }: { user: UserPublicAttributes }) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
