import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from '../../entities/Batch';
import { Repository } from 'typeorm';
import { BatchStudent } from 'src/entities/BatchStudent';
import { BatchStudentEvaluation } from 'src/entities/BatchStudentEvaluation';
import { Employee } from 'src/entities/Employee';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch) private batchRepo: Repository<Batch>,
    @InjectRepository(BatchStudent)
    private batchStudent: Repository<BatchStudent>,
    @InjectRepository(Employee)
    private emp: Repository<Employee>,
  ) {}

  public async getBatch() {
    return await this.batchRepo.find({
      relations: {
        batchCoInstructor: { empEntity: true, empJoro: true },
        batchInstructor: { empEntity: true },
        batchRecruiter: { empEntity: true },
        batchProg: true,
      },
      order: {
        batchModifiedDate: 'desc',
      },
    });
  }

  public async updateBatch(id: number, fields: any) {
    try {
      const batchs = await this.batchRepo.findOne({ where: { batchId: id } });
      Object.assign(batchs, fields);
      return await this.batchRepo.save(batchs);
    } catch (error) {
      return error.message;
    }
  }

  public async deleteBatch(id: number) {
    try {
      const batch = await this.batchRepo.delete(id);
      return 'Delete' + batch.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
