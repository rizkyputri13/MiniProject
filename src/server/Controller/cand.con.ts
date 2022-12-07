import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { CandService } from '../Services/cand.srv';

@Controller('api/candidate')
@Injectable()
export class CandController {
  constructor(private candService: CandService) {}

  @Get('/batch')
  public async getBatch() {
    return this.candService.getBatch();
  }

  @Get('/apply')
  public async getApply() {
    return this.candService.getApply();
  }

  @Get('/filter')
  public async getFilter() {
    return this.candService.getFilter();
  }

  @Get('/contract')
  public async getContract() {
    return this.candService.getContract();
  }

  @Get('/disqualified')
  public async getDisqualified() {
    return this.candService.getDisqualified();
  }

  @Get('/notrespond')
  public async getNotRespond() {
    return this.candService.getNotRespond();
  }

  // @Get('api/candidate')
  // public async GetOne(@Param('id') id: number) {
  //   return this.candService.findOne(id);
  // }

  @Put('/editApply/:boapEntityId')
  public async updateApply(
    @Body() fields: any,
    @Param('boapEntityId', ParseIntPipe) boapEntityId: number,
  ) {
    fields.boapEntityId;

    return this.candService.updateApply(boapEntityId, fields);
  }

  @Put('/editFilter/:boapEntityId')
  public async updateFilter(
    @Body() fields: any,
    @Param('boapEntityId', ParseIntPipe) boapEntityId: number,
  ) {
    return this.candService.updateFilter(boapEntityId, fields);
  }

  @Put('/editContract/:boapEntityId')
  public async updateContract(
    @Body() fields: any,
    @Param('boapEntityId', ParseIntPipe) boapEntityId: number,
  ) {
    fields.boapEntityId;

    return this.candService.updateApply(boapEntityId, fields);
  }

  @Put('/editDisqualified/:boapEntityId')
  public async updateDisqualified(
    @Body() fields: any,
    @Param('boapEntityId', ParseIntPipe) boapEntityId: number,
  ) {
    fields.boapEntityId;

    return this.candService.updateDisqualified(boapEntityId, fields);
  }

  @Put('/editNotrespond/:boapEntityId')
  public async updateNotrespond(
    @Body() fields: any,
    @Param('boapEntityId', ParseIntPipe) boapEntityId: number,
  ) {
    fields.boapEntityId;

    return this.candService.updateNotrespond(boapEntityId, fields);
  }
}
