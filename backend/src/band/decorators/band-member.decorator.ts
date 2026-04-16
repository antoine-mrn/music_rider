import { applyDecorators, UseGuards } from '@nestjs/common';
import { BandMemberGuard } from '../guards/band-member.guard.ts';

export function BandMember() {
  return applyDecorators(UseGuards(BandMemberGuard));
}
