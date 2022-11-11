import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';
import { Employee } from './Employee';
import { JobCategory } from './JobCategory';
import { JobRole } from './JobRole';
import { JobType } from './JobType';
import { TalentApply } from './TalentApply';

@Index('job_post_pkey', ['jopoId'], { unique: true })
@Index('job_post_jopo_number_key', ['jopoNumber'], { unique: true })
@Entity('job_post', { schema: 'public' })
export class JobPost {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'jopo_id' })
  jopoId: number;

  @Column('character varying', {
    name: 'jopo_number',
    unique: true,
    length: 25,
    default: () => 'job_id()',
  })
  jopoNumber: string;

  @Column('character varying', { name: 'jopo_title', length: 255 })
  jopoTitle: string;

  @Column('integer', { name: 'jopo_min_salary', nullable: true })
  jopoMinSalary: number | null;

  @Column('integer', { name: 'jopo_max_salary', nullable: true })
  jopoMaxSalary: number | null;

  @Column('json', { name: 'jopo_description', nullable: true })
  jopoDescription: object | null;

  @Column('json', { name: 'jopo_responsibility', nullable: true })
  jopoResponsibility: object | null;

  @Column('json', { name: 'jopo_target', nullable: true })
  jopoTarget: object | null;

  @Column('json', { name: 'jopo_benefit', nullable: true })
  jopoBenefit: object | null;

  @Column('timestamp without time zone', {
    name: 'jopo_start_date',
    nullable: true,
  })
  jopoStartDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'jopo_end_date',
    nullable: true,
  })
  jopoEndDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'jopo_publish_date',
    nullable: true,
  })
  jopoPublishDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'jopo_modified_date',
    nullable: true,
  })
  jopoModifiedDate: Date | null;

  @Column('character varying', {
    name: 'jopo_status',
    nullable: true,
    length: 15,
  })
  jopoStatus: string | null;

  @ManyToOne(() => Client, (client) => client.jobPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'jopo_clit_id', referencedColumnName: 'clitId' }])
  jopoClit: Client;

  @ManyToOne(() => Employee, (employee) => employee.jobPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'jopo_emp_entity_id', referencedColumnName: 'empEntityId' },
  ])
  jopoEmpEntity: Employee;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'jopo_joca_id', referencedColumnName: 'jocaId' }])
  jopoJoca: JobCategory;

  @ManyToOne(() => JobRole, (jobRole) => jobRole.jobPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'jopo_joro_id', referencedColumnName: 'joroId' }])
  jopoJoro: JobRole;

  @ManyToOne(() => JobType, (jobType) => jobType.jobPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'jopo_joty_id', referencedColumnName: 'jotyId' }])
  jopoJoty: JobType;

  @OneToMany(() => TalentApply, (talentApply) => talentApply.taapJopo)
  talentApplies: TalentApply[];
}
