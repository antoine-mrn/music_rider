import { applyDecorators, UseGuards } from '@nestjs/common';
import { BandMemberUpdateGuard } from '../guards/band-member-update.guard';

export function CanUpdateBandMemberGuard() {
  return applyDecorators(UseGuards(BandMemberUpdateGuard));
}
