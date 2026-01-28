import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtAuthGuard } from './guards/at-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { AuthSessionModule } from 'src/auth-session/auth-session.module';

@Module({
  imports: [UserModule, PassportModule, JwtModule, AuthSessionModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtAuthGuard,
    },
    AuthService,
    LocalStrategy,
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
