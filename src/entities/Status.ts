import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SalesOrderHeader } from './SalesOrderHeader';
import { Modules } from './Modules';

@Index('status_pkey', ['status'], { unique: true })
@Entity('status', { schema: 'public' })
export class Status {
  @Column('character varying', { primary: true, name: 'status', length: 15 })
  status: string;

  @Column('timestamp without time zone', {
    name: 'status_modified_date',
    nullable: true,
  })
  statusModifiedDate: Date | null;

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.soheStatus,
  )
  salesOrderHeaders: SalesOrderHeader[];

  @ManyToOne(() => Modules, (modules) => modules.statuses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'status_module', referencedColumnName: 'moduleName' }])
  statusModule: Modules;
}
