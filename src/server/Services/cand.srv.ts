import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';
import { UsersEmail } from 'src/entities/UsersEmail';
import { UsersEducation } from 'src/entities/UsersEducation';
import { UsersPhones } from 'src/entities/UsersPhones';
import { BatchStudent } from 'src/entities/BatchStudent';
import { UsersSkill } from 'src/entities/UsersSkill';

@Injectable()
export class CandService {
  constructor(
    @InjectRepository(Users) private candRepo: Repository<Users>,
    @InjectRepository(UsersEmail) private usersEmail: Repository<UsersEmail>,
    @InjectRepository(UsersEducation)
    private usersEducation: Repository<UsersEducation>,
    @InjectRepository(UsersPhones) private usersPhones: Repository<UsersPhones>,
    @InjectRepository(UsersSkill) private usersSkill: Repository<UsersSkill>,
    @InjectRepository(BatchStudent)
    private batchStudent: Repository<BatchStudent>,
  ) {}

  public async findAll() {
    return await this.candRepo.find({});
  }

  public async findOne(id: any) {
    return await this.candRepo.findOne({
      where: { userEntityId: id },
    });
  }

  public async update(id: number) {
    try {
      return await this.candRepo.findOne({ where: { userEntityId: id } });
    } catch (error) {
      return error.message;
    }
  }
}

//   relations: ['sktyName', 'bastStatus', 'bastTotalScore'],
//   select: {
//     sktyName: { sktyName: true },
//     batchCoInstructor: { empEntityId: true },
//     batchInstructor: { empEntityId: true },
//     batchRecruiter: { empEntityId: true },
//   },
