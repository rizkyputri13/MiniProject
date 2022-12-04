import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigMulter } from './Middleware/multer.conf';
import { UsersService } from './Services/usr.srv';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './Auth/local.strategy';
import { JwtStrategy } from './Auth/jwt.strategy';
import { UserController } from './Controller/usr.con';
import { Users } from '../entities/Users';
import { UsersEmail } from '../entities/UsersEmail';
import { UsersPhones } from '../entities/UsersPhones';
import { UsersRoles } from '../entities/UsersRoles';
import { Entities } from '../entities/Entities';
import { Roles } from '../entities/Roles';
import { CandController } from './Controller/cand.con';
import { BatchController } from './Controller/batch.con';
import { CandService } from './Services/cand.srv';
import { BatchService } from './Services/batch.srv';
import { Batch } from 'src/entities/Batch';
import { BatchStudent } from 'src/entities/BatchStudent';
import { UsersEducation } from 'src/entities/UsersEducation';
import { UsersSkill } from 'src/entities/UsersSkill';
import { BatchStudentEvaluation } from 'src/entities/BatchStudentEvaluation';
import { Employee } from 'src/entities/Employee';
import { BootcampApply } from 'src/entities/BootcampApply';
import { ProgramEntity } from 'src/entities/ProgramEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Batch,
      BatchStudent,
      Users,
      UsersEducation,
      UsersEmail,
      UsersPhones,
      UsersRoles,
      Entities,
      Roles,
      UsersSkill,
      BatchStudentEvaluation,
      Employee,
      BootcampApply,
      ProgramEntity,
    ]),
    MulterModule.register(ConfigMulter.UploadFiles()),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [
    UsersService,
    CandService,
    BatchService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [UserController, CandController, BatchController],
  exports: [UsersService],
})
export class ServerModule {}
