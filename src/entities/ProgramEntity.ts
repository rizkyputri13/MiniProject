import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Batch } from './Batch';
import { BootcampApply } from './BootcampApply';
import { CartItems } from './CartItems';
import { CouponOfterCourse } from './CouponOfterCourse';
import { Courses } from './Courses';
import { Category } from './Category';
import { City } from './City';
import { ProgramsReview } from './ProgramsReview';
import { SalesOrderDetail } from './SalesOrderDetail';

@Index('program_entity_pkey', ['progId'], { unique: true })
@Entity('program_entity', { schema: 'public' })
export class ProgramEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'prog_id' })
  progId: number;

  @Column('character varying', { name: 'prog_title', length: 256 })
  progTitle: string;

  @Column('character varying', { name: 'prog_headline', length: 512 })
  progHeadline: string;

  @Column('character varying', {
    name: 'prog_type',
    nullable: true,
    length: 15,
  })
  progType: string | null;

  @Column('character varying', {
    name: 'prog_learning_type',
    nullable: true,
    length: 15,
  })
  progLearningType: string | null;

  @Column('numeric', { name: 'prog_rating', nullable: true })
  progRating: string | null;

  @Column('integer', { name: 'prog_total_student', nullable: true })
  progTotalStudent: number | null;

  @Column('timestamp without time zone', {
    name: 'prog_modified_date',
    nullable: true,
  })
  progModifiedDate: Date | null;

  @Column('character varying', {
    name: 'prog_image',
    nullable: true,
    length: 256,
  })
  progImage: string | null;

  @OneToMany(() => Batch, (batch) => batch.batchProg)
  batches: Batch[];

  @OneToOne(() => BootcampApply, (bootcampApply) => bootcampApply.boapProg)
  bootcampApply: BootcampApply;

  @OneToMany(() => CartItems, (cartItems) => cartItems.caitProg)
  cartItems: CartItems[];

  @OneToMany(
    () => CouponOfterCourse,
    (couponOfterCourse) => couponOfterCourse.sacaProg,
  )
  couponOfterCourses: CouponOfterCourse[];

  @OneToOne(() => Courses, (courses) => courses.corseProg)
  courses: Courses;

  @ManyToOne(() => Category, (category) => category.programEntities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'prog_cate_id', referencedColumnName: 'cateId' }])
  progCate: Category;

  @ManyToOne(() => City, (city) => city.programEntities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'prog_city_id', referencedColumnName: 'cityId' }])
  progCity: City;

  @OneToMany(() => ProgramsReview, (programsReview) => programsReview.poreProg)
  programsReviews: ProgramsReview[];

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.sodeProg,
  )
  salesOrderDetails: SalesOrderDetail[];
}
