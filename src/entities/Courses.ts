import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contents } from './Contents';
import { CourseReview } from './CourseReview';
import { ProgramEntity } from './ProgramEntity';
import { InstructorCourse } from './InstructorCourse';
import { StudentCourse } from './StudentCourse';

@Index('courses_pkey', ['corseProgId'], { unique: true })
@Entity('courses', { schema: 'public' })
export class Courses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'corse_prog_id' })
  corseProgId: number;

  @Column('character', { name: 'corse_best_seler', nullable: true, length: 1 })
  corseBestSeler: string | null;

  @Column('numeric', { name: 'corse_price', nullable: true })
  corsePrice: string | null;

  @Column('character varying', {
    name: 'corse_language',
    nullable: true,
    length: 35,
  })
  corseLanguage: string | null;

  @Column('json', { name: 'corse_item_learning', nullable: true })
  corseItemLearning: object | null;

  @Column('json', { name: 'corse_item_include', nullable: true })
  corseItemInclude: object | null;

  @Column('json', { name: 'corse_requirement', nullable: true })
  corseRequirement: object | null;

  @Column('json', { name: 'corse_description', nullable: true })
  corseDescription: object | null;

  @Column('json', { name: 'corse_target_level', nullable: true })
  corseTargetLevel: object | null;

  @Column('timestamp without time zone', {
    name: 'corse_modified_date',
    nullable: true,
  })
  corseModifiedDate: Date | null;

  @Column('character varying', {
    name: 'corse_status',
    nullable: true,
    length: 15,
  })
  corseStatus: string | null;

  @OneToMany(() => Contents, (contents) => contents.contProg)
  contents: Contents[];

  @OneToMany(() => CourseReview, (courseReview) => courseReview.coreProg)
  courseReviews: CourseReview[];

  @OneToOne(() => ProgramEntity, (programEntity) => programEntity.courses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'corse_prog_id', referencedColumnName: 'progId' }])
  corseProg: ProgramEntity;

  @OneToMany(
    () => InstructorCourse,
    (instructorCourse) => instructorCourse.incoProg,
  )
  instructorCourses: InstructorCourse[];

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.studProg)
  studentCourses: StudentCourse[];
}
