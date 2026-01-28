import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthSessionModule } from './auth-session/auth-session.module';
import { UserModule } from './users/user.module';
import { BandModule } from './band/band.module';
import { TechnicalRiderModule } from './technical-rider/technical-rider.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    AuthSessionModule,
    BandModule,
    TechnicalRiderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
