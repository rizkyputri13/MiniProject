import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BootcampApply } from './BootcampApply';
import { RouteActions } from './RouteActions';

@Index(
  'bootcamp_apply_progress_pkey',
  ['baprEntityId', 'baprId', 'baprProgId'],
  { unique: true },
)
@Entity('bootcamp_apply_progress', { schema: 'public' })
export class BootcampApplyProgress {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'bapr_id' })
  baprId: number;

  @Column('integer', { primary: true, name: 'bapr_prog_id' })
  baprProgId: number;

  @Column('integer', { primary: true, name: 'bapr_entity_id' })
  baprEntityId: number;

  @Column('character varying', {
    name: 'boar_comment',
    nullable: true,
    length: 512,
  })
  boarComment: string | null;

  @Column('date', { name: 'boar_modified_date', nullable: true })
  boarModifiedDate: string | null;

  @Column('character varying', {
    name: 'bor_status',
    nullable: true,
    length: 15,
  })
  borStatus: string | null;

  @ManyToOne(
    () => BootcampApply,
    (bootcampApply) => bootcampApply.bootcampApplyProgresses,
  )
  @JoinColumn([{ name: 'bapr_prog_id', referencedColumnName: 'boapProgId' }])
  baprProg: BootcampApply;

  @ManyToOne(
    () => RouteActions,
    (routeActions) => routeActions.bootcampApplyProgresses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'bapr_roac_id', referencedColumnName: 'roacId' }])
  baprRoac: RouteActions;

  @ManyToOne(
    () => BootcampApply,
    (bootcampApply) => bootcampApply.bootcampApplyProgresses2,
  )
  @JoinColumn([
    { name: 'bapr_entity_id', referencedColumnName: 'boapEntityId' },
  ])
  baprEntity: BootcampApply;
}
