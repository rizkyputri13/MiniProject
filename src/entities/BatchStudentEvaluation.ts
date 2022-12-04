import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BatchStudent } from './BatchStudent';

@Index('batch_student_evaluation_pkey', ['baseId'], { unique: true })
@Entity('batch_student_evaluation', { schema: 'public' })
export class BatchStudentEvaluation {
  @Column('integer', { primary: true, name: 'base_id' })
  baseId: number;

  @Column('character varying', {
    name: 'base_type',
    nullable: true,
    length: 15,
  })
  baseType: string | null;

  @Column('character varying', {
    name: 'base_skill',
    nullable: true,
    length: 256,
  })
  baseSkill: string | null;

  @Column('integer', { name: 'base_grade', nullable: true })
  baseGrade: number | null;

  @Column('character varying', {
    name: 'base_note',
    nullable: true,
    length: 256,
  })
  baseNote: string | null;

  @Column('integer', { name: 'base_order', nullable: true })
  baseOrder: number | null;

  @Column('date', { name: 'base_modified_date', nullable: true })
  baseModifiedDate: string | null;

  @ManyToOne(
    () => BatchStudent,
    (batchStudent) => batchStudent.batchStudentEvaluations,
  )
  @JoinColumn([{ name: 'base_bast_id', referencedColumnName: 'bastId' }])
  baseBast: BatchStudent;
}
