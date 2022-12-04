import { Body, Controller, Get, Injectable, Param, Put } from '@nestjs/common';

import { CandService } from '../Services/cand.srv';

@Controller('api/candidate')
@Injectable()
export class CandController {
  constructor(private candService: CandService) {}

  @Get('/batch')
  public async getBatch() {
    return this.candService.getBatch();
  }

  @Get('/bootcamp')
  public async getBoot() {
    return this.candService.getBoot();
  }

  @Get('/program')
  public async getProg() {
    return this.candService.getProg();
  }

  @Get('/user')
  public async getUser() {
    return this.candService.getUser();
  }

  @Get('/userEdu')
  public async getUserEdu() {
    return this.candService.getUserEdu();
  }

  // @Get('api/candidate')
  // public async GetOne(@Param('id') id: number) {
  //   return this.candService.findOne(id);
  // }

  @Put('/updateCandidate')
  public async update(@Body() fields: any, @Param('id') userEntityId: number) {
    fields.userEntityId;

    return this.candService.update(userEntityId);
  }
}
