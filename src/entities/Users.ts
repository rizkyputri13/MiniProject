import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BatchStudent } from './BatchStudent';
import { BootcampApply } from './BootcampApply';
import { CartItems } from './CartItems';
import { CourseReview } from './CourseReview';
import { Employee } from './Employee';
import { PaymentGateaway } from './PaymentGateaway';
import { PaymentTransaction } from './PaymentTransaction';
import { ProgramsReview } from './ProgramsReview';
import { SalesOrderHeader } from './SalesOrderHeader';
import { StudentCourse } from './StudentCourse';
import { StudentEvaluation } from './StudentEvaluation';
import { TalentApply } from './TalentApply';
import { UserAccounts } from './UserAccounts';
import { Entities } from './Entities';
import { UsersAddress } from './UsersAddress';
import { UsersEducation } from './UsersEducation';
import { UsersEmail } from './UsersEmail';
import { UsersExperiences } from './UsersExperiences';
import { UsersMedia } from './UsersMedia';
import { UsersPhones } from './UsersPhones';
import { UsersRoles } from './UsersRoles';
import { UsersSkill } from './UsersSkill';

@Index('users_pkey', ['userEntityId'], { unique: true })
@Index('users_user_name_key', ['userName'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @Column('integer', { primary: true, name: 'user_entity_id' })
  userEntityId: number;

  @Column('character varying', {
    name: 'user_name',
    nullable: true,
    unique: true,
    length: 15,
  })
  userName: string | null;

  @Column('character varying', {
    name: 'user_password',
    nullable: true,
    length: 256,
  })
  userPassword: string | null;

  @Column('character varying', {
    name: 'user_first_name',
    nullable: true,
    length: 50,
  })
  userFirstName: string | null;

  @Column('character varying', {
    name: 'user_last_name',
    nullable: true,
    length: 50,
  })
  userLastName: string | null;

  @Column('integer', {
    name: 'user_email_promotion',
    nullable: true,
    default: () => '0',
  })
  userEmailPromotion: number | null;

  @Column('json', { name: 'user_demographic', nullable: true })
  userDemographic: object | null;

  @Column('timestamp without time zone', {
    name: 'user_modified_date',
    nullable: true,
  })
  userModifiedDate: Date | null;

  @Column('character varying', {
    name: 'user_photo',
    nullable: true,
    length: 255,
  })
  userPhoto: string | null;

  @OneToMany(() => BatchStudent, (batchStudent) => batchStudent.bastEntity)
  batchStudents: BatchStudent[];

  @OneToOne(() => BootcampApply, (bootcampApply) => bootcampApply.boapEntity)
  bootcampApply: BootcampApply;

  @OneToMany(() => CartItems, (cartItems) => cartItems.caitEntity)
  cartItems: CartItems[];

  @OneToMany(() => CourseReview, (courseReview) => courseReview.coreEntity)
  courseReviews: CourseReview[];

  @OneToOne(() => Employee, (employee) => employee.empEntity)
  employee: Employee;

  @OneToMany(
    () => PaymentGateaway,
    (paymentGateaway) => paymentGateaway.pagaOwner,
  )
  paymentGateaways: PaymentGateaway[];

  @OneToMany(
    () => PaymentTransaction,
    (paymentTransaction) => paymentTransaction.patrUserEntity,
  )
  paymentTransactions: PaymentTransaction[];

  @OneToMany(
    () => ProgramsReview,
    (programsReview) => programsReview.poreEntity,
  )
  programsReviews: ProgramsReview[];

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.soheStudentEntity,
  )
  salesOrderHeaders: SalesOrderHeader[];

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.studEntity)
  studentCourses: StudentCourse[];

  @OneToMany(
    () => StudentEvaluation,
    (studentEvaluation) => studentEvaluation.stevEntity,
  )
  studentEvaluations: StudentEvaluation[];

  @OneToMany(() => TalentApply, (talentApply) => talentApply.taapEntity)
  talentApplies: TalentApply[];

  @OneToMany(() => UserAccounts, (userAccounts) => userAccounts.usacUserEntity)
  userAccounts: UserAccounts[];

  @OneToOne(() => Entities, (entities) => entities.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_entity_id', referencedColumnName: 'entityId' }])
  userEntity: Entities;

  @OneToMany(() => UsersAddress, (usersAddress) => usersAddress.etadEntity)
  usersAddresses: UsersAddress[];

  @OneToMany(
    () => UsersEducation,
    (usersEducation) => usersEducation.usduEntity,
  )
  usersEducations: UsersEducation[];

  @OneToMany(() => UsersEmail, (usersEmail) => usersEmail.pmailEntity)
  usersEmail: UsersEmail[];

  @OneToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usexEntity,
  )
  usersExperiences: UsersExperiences[];

  @OneToMany(() => UsersMedia, (usersMedia) => usersMedia.usmeEntity)
  usersMedias: UsersMedia[];

  @OneToOne(() => UsersPhones, (usersPhones) => usersPhones.uspoEntity)
  usersPhones: UsersPhones;

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.usroEntity)
  usersRoles: UsersRoles[];

  @OneToMany(() => UsersSkill, (usersSkill) => usersSkill.uskiEntity)
  usersSkills: UsersSkill[];
}
