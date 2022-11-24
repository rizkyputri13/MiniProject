import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from '../../entities/Batch';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(@InjectRepository(Batch) private batchRepo: Repository<Batch>) {}

  public async findAll() {
    return await this.batchRepo.find({});
  }

  public async findOne(id: any) {
    return await this.batchRepo.findOne({
      where: { batchId: id },
    });
  }

  public async update(id: number) {
    try {
      return await this.batchRepo.findOne({ where: { batchId: id } });
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: number) {
    try {
      const batch = await this.batchRepo.delete(id);
      return 'Delete' + batch.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}

// relations: [
//   'batchProg',
//   'batchCoInstructor',
//   'batchInstructor',
//   'batchRecruiter',
// ],
// select: {
//   batchProg: { progId: true },
//   batchCoInstructor: { empEntityId: true },
//   batchInstructor: { empEntityId: true },
//   batchRecruiter: { empEntityId: true },
// },
