import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';
import { Batch } from 'src/entities/Batch';
import { UsersEducation } from 'src/entities/UsersEducation';
import { BootcampApply } from 'src/entities/BootcampApply';
import { ProgramEntity } from 'src/entities/ProgramEntity';

@Injectable()
export class CandService {
  constructor(
    @InjectRepository(Batch) private batch: Repository<Batch>,
    @InjectRepository(BootcampApply) private boot: Repository<BootcampApply>,
    @InjectRepository(ProgramEntity) private prog: Repository<ProgramEntity>,
    @InjectRepository(Users) private candRepo: Repository<Users>,
    @InjectRepository(UsersEducation)
    private usersEdu: Repository<UsersEducation>,
  ) {}

  public async getBatch() {
    return await this.batch.find({
      relations: {
        batchProg: true,
      },
      order: {
        batchModifiedDate: 'desc',
      },
    });
  }

  // public async getBoot(): Promise<BootcampApply[]> {
  //   const getBootcamp = await this.boot.find({
  //     relations: ['boapEntity', 'boapProg'],
  //     select: {
  //       boapEntity: {
  //         userEntityId: true,
  //         //usersEmail: { pmailId: true },
  //         userName: true,
  //       },
  //       boapProg: { progId: true, progTitle: true },
  //     },
  //     order: {
  //       boapModifiedDate: 'desc',
  //     },
  //   });
  //   return getBootcamp;
  // }

  public async getBoot() {
    return await this.boot.find({
      relations: {
        boapEntity: {
          userEntity: true,
          usersEducations: true,
          usersEmail: true,
          usersPhones: true,
        },
        boapProg: true,
      },
      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

  public async getProg() {
    return await this.prog.find({
      relations: {
        progCate: true,
        progCity: true,
      },
      order: {
        progModifiedDate: 'desc',
      },
    });
  }

  public async getUser() {
    return await this.candRepo.find({
      relations: {
        userEntity: true,
        //usersRoles: { usroEntity: true },
        usersEducations: { usduEntity: true },
        usersEmail: { pmailEntity: true },
        usersPhones: true,
        //usersSkills: { uskiEntity: true },
        batchStudents: { bastEntity: true },
      },
      order: {
        userModifiedDate: 'desc',
      },
    });
  }

  public async getUserEdu() {
    return await this.usersEdu.find({
      relations: {
        usduEntity: true,
      },
      order: {
        usduModifiedDate: 'desc',
      },
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
