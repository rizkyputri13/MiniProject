import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Batch } from './Batch';
import { Users } from './Users';
import { JobRole } from './JobRole';
import { EmployeeClientContract } from './EmployeeClientContract';
import { EmployeeDepartmentHistory } from './EmployeeDepartmentHistory';
import { EmployeePayHistory } from './EmployeePayHistory';
import { InstructorCourse } from './InstructorCourse';
import { JobPost } from './JobPost';

@Index('employee_emp_emp_number_key', ['empEmpNumber'], { unique: true })
@Index('employee_pkey', ['empEntityId'], { unique: true })
@Index('employee_emp_national_id_key', ['empNationalId'], { unique: true })
@Entity('employee', { schema: 'public' })
export class Employee {
  @Column('integer', {
    primary: true,
    name: 'emp_entity_id',
    default: () => 'hr_id()',
  })
  empEntityId: number;

  @Column('character varying', {
    name: 'emp_emp_number',
    unique: true,
    length: 25,
  })
  empEmpNumber: string;

  @Column('character varying', {
    name: 'emp_national_id',
    unique: true,
    length: 25,
  })
  empNationalId: string;

  @Column('character varying', {
    name: 'emp_login_id',
    nullable: true,
    length: 85,
  })
  empLoginId: string | null;

  @Column('timestamp without time zone', { name: 'emp_birth_date' })
  empBirthDate: Date;

  @Column('character', { name: 'emp_marital_status', length: 1 })
  empMaritalStatus: string;

  @Column('character', { name: 'emp_gender', length: 1 })
  empGender: string;

  @Column('timestamp without time zone', { name: 'emp_hire_date' })
  empHireDate: Date;

  @Column('character', { name: 'emp_salaried_flag', length: 1 })
  empSalariedFlag: string;

  @Column('smallint', { name: 'emp_vacation_hours', nullable: true })
  empVacationHours: number | null;

  @Column('smallint', { name: 'emp_sickleave_hours', nullable: true })
  empSickleaveHours: number | null;

  @Column('smallint', { name: 'emp_current_flag', nullable: true })
  empCurrentFlag: number | null;

  @Column('timestamp without time zone', {
    name: 'emp_modified_date',
    nullable: true,
  })
  empModifiedDate: Date | null;

  @OneToMany(() => Batch, (batch) => batch.batchCoInstructor)
  batches: Batch[];

  @OneToMany(() => Batch, (batch) => batch.batchInstructor)
  batches2: Batch[];

  @OneToMany(() => Batch, (batch) => batch.batchRecruiter)
  batches3: Batch[];

  @ManyToOne(() => Employee, (employee) => employee.employees)
  @JoinColumn([
    { name: 'emp_emp_entity_id', referencedColumnName: 'empEntityId' },
  ])
  empEmpEntity: Employee;

  @OneToMany(() => Employee, (employee) => employee.empEmpEntity)
  employees: Employee[];

  @OneToOne(() => Users, (users) => users.employee)
  @JoinColumn([{ name: 'emp_entity_id', referencedColumnName: 'userEntityId' }])
  empEntity: Users;

  @ManyToOne(() => JobRole, (jobRole) => jobRole.employees)
  @JoinColumn([{ name: 'emp_joro_id', referencedColumnName: 'joroId' }])
  empJoro: JobRole;

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoAccountManager,
  )
  employeeClientContracts: EmployeeClientContract[];

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoEntity,
  )
  employeeClientContracts2: EmployeeClientContract[];

  @OneToMany(
    () => EmployeeDepartmentHistory,
    (employeeDepartmentHistory) => employeeDepartmentHistory.edhiEntity,
  )
  employeeDepartmentHistories: EmployeeDepartmentHistory[];

  @OneToMany(
    () => EmployeePayHistory,
    (employeePayHistory) => employeePayHistory.ephiEntity,
  )
  employeePayHistories: EmployeePayHistory[];

  @OneToMany(
    () => InstructorCourse,
    (instructorCourse) => instructorCourse.incoEntity,
  )
  instructorCourses: InstructorCourse[];

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoEmpEntity)
  jobPosts: JobPost[];
}
