import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from '../../entities/Batch';
import { In, Repository } from 'typeorm';
import { BatchStudent } from 'src/entities/BatchStudent';
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
        batchStudents: { bastEntity: { userEntity: true } },
      },
      order: {
        batchModifiedDate: 'desc',
      },
    });
  }

  public async getBatchStudents(batchId: number) {
    try {
      const students = await this.batchStudent.find({
        where: { bastBatchId: batchId },
      });
      return students;
    } catch (error) {
      return error;
    }
  }

  public async updateBatch(batchId: number, fields: any) {
    try {
      const batchs = await this.batchRepo.findOne({
        where: { batchId: batchId },
      });
      Object.assign(batchs, fields);
      return await this.batchRepo.save(batchs);
    } catch (error) {
      return error.message;
    }
  }

  public async deleteBatch(batchId: number) {
    try {
      //const batch = await this.batchRepo.delete(batchId);
      //get students
      const students = await this.getBatchStudents(batchId);
      const idStudent = students.map((student) => student.bastId);
      //del students
      await this.batchStudent.delete({ bastId: In(idStudent) });
      //del batch
      const batch = await this.batchRepo.delete({ batchId: batchId });
      return 'Delete' + batch.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
