import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee';
import { Client } from './Client';
import { JobType } from './JobType';

@Index('pk_employee_client_contract', ['eccoEntityId', 'eccoId'], {
  unique: true,
})
@Entity('employee_client_contract', { schema: 'public' })
export class EmployeeClientContract {
  @Column('integer', { primary: true, name: 'ecco_entity_id' })
  eccoEntityId: number;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'ecco_id' })
  eccoId: number;

  @Column('character varying', {
    name: 'ecco_contract_no',
    nullable: true,
    length: 55,
  })
  eccoContractNo: string | null;

  @Column('timestamp without time zone', {
    name: 'ecco_contract_date',
    nullable: true,
  })
  eccoContractDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'ecco_start_date',
    nullable: true,
  })
  eccoStartDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'ecco_end_date',
    nullable: true,
  })
  eccoEndDate: Date | null;

  @Column('character varying', {
    name: 'ecco_comment',
    nullable: true,
    length: 512,
  })
  eccoComment: string | null;

  @Column('timestamp without time zone', {
    name: 'ecco_modified_date',
    nullable: true,
  })
  eccoModifiedDate: Date | null;

  @Column('character varying', {
    name: 'ecco_media_link',
    nullable: true,
    length: 255,
  })
  eccoMediaLink: string | null;

  @Column('character varying', {
    name: 'ecco_status',
    nullable: true,
    length: 15,
  })
  eccoStatus: string | null;

  @ManyToOne(() => Employee, (employee) => employee.employeeClientContracts)
  @JoinColumn([
    { name: 'ecco_account_manager', referencedColumnName: 'empEntityId' },
  ])
  eccoAccountManager: Employee;

  @ManyToOne(() => Client, (client) => client.employeeClientContracts)
  @JoinColumn([{ name: 'ecco_clit_id', referencedColumnName: 'clitId' }])
  eccoClit: Client;

  @ManyToOne(() => Employee, (employee) => employee.employeeClientContracts2)
  @JoinColumn([{ name: 'ecco_entity_id', referencedColumnName: 'empEntityId' }])
  eccoEntity: Employee;

  @ManyToOne(() => JobType, (jobType) => jobType.employeeClientContracts)
  @JoinColumn([{ name: 'ecco_joty_id', referencedColumnName: 'jotyId' }])
  eccoJoty: JobType;
}
