import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BandModule } from 'src/band/band.module';
import { TechnicalRiderModule } from 'src/technical-rider/technical-rider.module';

@Module({
  imports: [BandModule, TechnicalRiderModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
