import { Body, Controller, Get, Param, Put } from '@nestjs/common';

import { CandService } from '../Services/cand.srv';

@Controller()
export class CandController {
  constructor(private candService: CandService) {}

  @Get('/')
  async GetAll() {
    return this.candService.findAll();
  }

  @Get('api/candidate')
  public async GetOne(@Param('id') id: number) {
    return this.candService.findOne(id);
  }

  @Put('api/candidate')
  public async Updated(@Body() fields: any, @Param('id') userEntityId: number) {
    fields.userEntityId;

    return this.candService.update(userEntityId);
  }
}
