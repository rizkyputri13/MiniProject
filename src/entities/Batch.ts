import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee';
import { ProgramEntity } from './ProgramEntity';
import { BatchStudent } from './BatchStudent';

@Index('batch_pkey', ['batchId'], { unique: true })
@Entity('batch', { schema: 'public' })
export class Batch {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'batch_id' })
  batchId: number;

  @Column('character varying', {
    name: 'batch_name',
    nullable: true,
    length: 15,
  })
  batchName: string | null;

  @Column('date', { name: 'batch_start_date', nullable: true })
  batchStartDate: string | null;

  @Column('date', { name: 'batch_end_date', nullable: true })
  batchEndDate: string | null;

  @Column('character varying', {
    name: 'batch_status',
    nullable: true,
    length: 15,
  })
  batchStatus: string | null;

  @Column('character varying', {
    name: 'batch_reason',
    nullable: true,
    length: 255,
  })
  batchReason: string | null;

  @Column('character varying', {
    name: 'batch_type',
    nullable: true,
    length: 15,
  })
  batchType: string | null;

  @Column('date', { name: 'batch_modified_date', nullable: true })
  batchModifiedDate: string | null;

  @ManyToOne(() => Employee, (employee) => employee.batches, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'batch_co_instructor_id', referencedColumnName: 'empEntityId' },
  ])
  batchCoInstructor: Employee;

  @ManyToOne(() => Employee, (employee) => employee.batches2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'batch_instructor_id', referencedColumnName: 'empEntityId' },
  ])
  batchInstructor: Employee;

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.batches, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'batch_prog_id', referencedColumnName: 'progId' }])
  batchProg: ProgramEntity;

  @ManyToOne(() => Employee, (employee) => employee.batches3, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'batch_recruiter_id', referencedColumnName: 'empEntityId' },
  ])
  batchRecruiter: Employee;

  @OneToMany(() => BatchStudent, (batchStudent) => batchStudent.bastBatch)
  batchStudents: BatchStudent[];
}
