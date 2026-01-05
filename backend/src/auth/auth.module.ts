import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './at.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AtAuthGuard } from './guards/at-auth.guard';
import { RtStrategy } from './rt.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
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
