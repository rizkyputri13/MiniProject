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
    @InjectRepository(BootcampApply) private boot: Repository<BootcampApply>,
    @InjectRepository(Batch) private batch: Repository<Batch>,
    @InjectRepository(Users) private candRepo: Repository<Users>,
  ) {}

  public async getApply() {
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
      where: { boapStatus: 'Apply' },
      // [
      //   {
      //     boapStatus: 'Apply',
      //   },
      //   { boapStatus: 'Ready Test' },
      // ],
      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

  public async getFilter() {
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
      where: {
        boapStatus: 'Ready Test',
      },
      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

  public async getContract() {
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
      where: [
        {
          boapStatus: 'Passed',
        },
        {
          boapStatus: 'Recommended',
        },
        {
          boapStatus: 'Contracted',
        },
      ],

      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

  public async getDisqualified() {
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
      where: {
        boapStatus: 'Failed',
      },
      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

  public async getNotRespond() {
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
      where: {
        boapStatus: 'Not Responding',
      },
      order: {
        boapModifiedDate: 'desc',
      },
    });
  }

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

  public async updateApply(boapEntityId: number, fields: any) {
    try {
      const app = await this.boot.findOne({
        where: { boapEntityId: boapEntityId },
      });
      Object.assign(app, fields);
      await this.boot.save(app);
      return await this.getFilterById(boapEntityId);
    } catch (error) {
      return error.message;
    }
  }

  public async getFilterById(id: number) {
    try {
      const filter = await this.boot.findOne({
        relations: {
          boapEntity: {
            userEntity: true,
            usersEducations: true,
            usersEmail: true,
            usersPhones: true,
          },
          boapProg: true,
        },
        where: { boapEntityId: id },
      });
      return filter;
    } catch (error) {
      return error.message;
    }
  }

  public async updateFilter(boapEntityId: number, fields: any) {
    try {
      const fil = await this.boot.findOne({
        where: { boapEntityId: boapEntityId },
      });
      Object.assign(fil, fields);
      await this.boot.save(fil);
      return await this.getFilterById(boapEntityId);
    } catch (error) {
      return error.message;
    }
  }

  public async updateContract(boapEntityId: number, fields: any) {
    try {
      const con = await this.boot.findOne({
        where: { boapEntityId: boapEntityId },
      });
      Object.assign(con, fields);
      await this.boot.save(con);
      return await this.getFilterById(boapEntityId);
    } catch (error) {
      return error.message;
    }
  }

  public async updateDisqualified(boapEntityId: number, fields: any) {
    try {
      const dis = await this.boot.findOne({
        where: { boapEntityId: boapEntityId },
      });
      Object.assign(dis, fields);
      await this.boot.save(dis);
      return await this.getFilterById(boapEntityId);
    } catch (error) {
      return error.message;
    }
  }

  public async updateNotrespond(boapEntityId: number, fields: any) {
    try {
      const not = await this.boot.findOne({
        where: { boapEntityId: boapEntityId },
      });
      Object.assign(not, fields);
      await this.boot.save(not);
      return await this.getFilterById(boapEntityId);
    } catch (error) {
      return error.message;
    }
  }
}
