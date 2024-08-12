import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { verify, hash } from 'argon2';
import { UserPublicAttributes } from '@src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<UserPublicAttributes> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User entry does not exist.');
    }

    const isVerified = await verify(user.passwordHash, password);

    if (!isVerified) {
      throw new UnauthorizedException('Wrong password.');
    }

    return user.toJSON();
  }

  async login(user: UserPublicAttributes): Promise<{ access_token: string }> {
    const payload = {
      userId: user.id,
      roleName: user.role?.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ password, ...data }: RegisterDto): Promise<UserPublicAttributes> {
    const passwordHash = await hash(password);

    const user = this.usersService.createUser({
      ...data,
      passwordHash,
    });

    return user;
  }
}
