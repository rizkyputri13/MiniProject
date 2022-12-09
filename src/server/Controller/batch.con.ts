/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
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

  @Get('/batchStudent/:id')
  public async getBatchStudents(@Param('id', ParseIntPipe) id: number) {
    return this.batchService.getBatchStudents(id);
  }

  @Put('/editBatch/:batchId')
  public async updateBatch(
    @Body() fields: any,
    @Param('batchId', ParseIntPipe) batchId: number,
  ) {
    fields.batchId;
    return this.batchService.updateBatch(batchId, fields);
  }

  @Delete('/removeBatch/:batchId')
  deleteBatch(@Param('batchId', ParseIntPipe) id: number) {
    return this.batchService.deleteBatch(id);
  }
}
