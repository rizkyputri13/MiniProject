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
    @InjectRepository(BatchStudentEvaluation)
    private batchEva: Repository<BatchStudentEvaluation>,
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

  public async getBatchStudent() {
    return await this.batchStudent.find({
      relations: {
        bastBatch: true,
        bastEntity: { userEntity: true },
      },
      order: {
        bastModifiedDate: 'desc',
      },
    });
  }

  public async getBatchEva() {
    return await this.batchEva.find({
      relations: {
        baseBast: { bastBatch: true },
      },
      order: {
        baseModifiedDate: 'desc',
      },
    });
  }

  public async getEmp() {
    return await this.emp.find({
      relations: {
        empEmpEntity: { empEntity: true, empJoro: true },
        empEntity: true,
        empJoro: true,
      },
      order: {
        empModifiedDate: 'desc',
      },
    });
  }

  public async update(id: number) {
    try {
      return await this.batchRepo.findOne({ where: { batchId: id } });
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const batch = await this.batchRepo.delete(id);
      return 'Delete' + batch.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
