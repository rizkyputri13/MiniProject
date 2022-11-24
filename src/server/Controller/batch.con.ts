import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import { BatchService } from '../Services/batch.srv';

@Controller()
export class BatchController {
  constructor(private batchService: BatchService) {}

  @Get()
  async GetAll() {
    return this.batchService.findAll();
  }

  @Get('api/batch')
  public async GetOne(@Param('id') id: number) {
    return this.batchService.findOne(id);
  }

  @Put('api/batch')
  public async Updated(@Body() fields: any, @Param('id') batchId: number) {
    fields.batchId;

    return this.batchService.update(batchId);
  }

  @Delete('api/batch')
  delete(@Param('id') id: number) {
    return this.batchService.delete(id);
  }
}
