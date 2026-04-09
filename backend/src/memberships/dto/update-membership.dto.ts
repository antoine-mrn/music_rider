import { PickType } from '@nestjs/mapped-types';
import { CreateMembershipDto } from './create-membership.dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateMembershipDto extends PickType(CreateMembershipDto, [
  'firstname',
  'lastname',
  'instrumentId',
] as const) {
  @IsNumber()
  membershipId: number;

  @IsOptional()
  @IsUUID()
  memberId?: string;
}
