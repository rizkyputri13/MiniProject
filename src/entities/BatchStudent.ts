import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Batch } from './Batch';
import { Users } from './Users';
import { BatchStudentEvaluation } from './BatchStudentEvaluation';

@Index('batch_student_pkey', ['bastBatchId', 'bastEntityId', 'bastId'], {
  unique: true,
})
@Index('bast_id_unique', ['bastId'], { unique: true })
@Entity('batch_student', { schema: 'public' })
export class BatchStudent {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'bast_id' })
  bastId: number;

  @Column('integer', { primary: true, name: 'bast_batch_id' })
  bastBatchId: number;

  @Column('integer', { primary: true, name: 'bast_entity_id' })
  bastEntityId: number;

  @Column('character varying', {
    name: 'bast_status',
    nullable: true,
    length: 15,
  })
  bastStatus: string | null;

  @Column('character varying', {
    name: 'bast_review',
    nullable: true,
    length: 512,
  })
  bastReview: string | null;

  @Column('integer', { name: 'bast_total_score', nullable: true })
  bastTotalScore: number | null;

  @Column('date', { name: 'bast_modified_date', nullable: true })
  bastModifiedDate: string | null;

  @ManyToOne(() => Batch, (batch) => batch.batchStudents)
  @JoinColumn([{ name: 'bast_batch_id', referencedColumnName: 'batchId' }])
  bastBatch: Batch;

  @ManyToOne(() => Users, (users) => users.batchStudents)
  @JoinColumn([
    { name: 'bast_entity_id', referencedColumnName: 'userEntityId' },
  ])
  bastEntity: Users;

  @OneToMany(
    () => BatchStudentEvaluation,
    (batchStudentEvaluation) => batchStudentEvaluation.baseBast,
  )
  batchStudentEvaluations: BatchStudentEvaluation[];
}
