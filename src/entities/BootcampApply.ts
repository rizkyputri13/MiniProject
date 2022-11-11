import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Users } from './Users';
import { ProgramEntity } from './ProgramEntity';
import { BootcampApplyProgress } from './BootcampApplyProgress';

@Index('boap_entity_unique', ['boapEntityId'], { unique: true })
@Index('bootcamp_apply_pkey', ['boapEntityId', 'boapProgId'], { unique: true })
@Index('boap_prog_unique', ['boapProgId'], { unique: true })
@Entity('bootcamp_apply', { schema: 'public' })
export class BootcampApply {
  @Column('integer', { primary: true, name: 'boap_prog_id' })
  boapProgId: number;

  @Column('integer', { primary: true, name: 'boap_entity_id' })
  boapEntityId: number;

  @Column('integer', { name: 'boap_total_skor', nullable: true })
  boapTotalSkor: number | null;

  @Column('character varying', {
    name: 'boap_review',
    nullable: true,
    length: 255,
  })
  boapReview: string | null;

  @Column('date', { name: 'boap_modified_date', nullable: true })
  boapModifiedDate: string | null;

  @Column('character varying', {
    name: 'boap_status',
    nullable: true,
    length: 15,
  })
  boapStatus: string | null;

  @OneToOne(() => Users, (users) => users.bootcampApply, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'boap_entity_id', referencedColumnName: 'userEntityId' },
  ])
  boapEntity: Users;

  @OneToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.bootcampApply,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'boap_prog_id', referencedColumnName: 'progId' }])
  boapProg: ProgramEntity;

  @OneToMany(
    () => BootcampApplyProgress,
    (bootcampApplyProgress) => bootcampApplyProgress.baprProg,
  )
  bootcampApplyProgresses: BootcampApplyProgress[];

  @OneToMany(
    () => BootcampApplyProgress,
    (bootcampApplyProgress) => bootcampApplyProgress.baprEntity,
  )
  bootcampApplyProgresses2: BootcampApplyProgress[];
}
