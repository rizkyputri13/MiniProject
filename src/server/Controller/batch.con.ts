/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Put,
} from '@nestjs/common';

import { BatchService } from '../Services/batch.srv';

@Controller('api/batch')
@Injectable()
export class BatchController {
  constructor(private batchService: BatchService) {}

  @Get('/batch')
  public async getBatch() {
    return this.batchService.getBatch();
  }

  // @Get('/batchStudent')
  // public async getBatchStudent() {
  //   return this.batchService.getBatchStudent();
  // }

  // @Get('/batchEva')
  // public async getprogram() {
  //   return this.batchService.getBatchEva();
  // }

  // @Get('/emp')
  // public async getEmp() {
  //   return this.batchService.getEmp();
  // }

  @Put('/editBatch/:id')
  public async updateBatch(@Body() fields: any, @Param('id') batchId: number) {
    fields.batchId;

    return this.batchService.updateBatch(batchId, fields);
  }

  @Delete('/removeBatch')
  deleteBatch(@Param('id') id: number) {
    return this.batchService.deleteBatch(id);
  }
}
