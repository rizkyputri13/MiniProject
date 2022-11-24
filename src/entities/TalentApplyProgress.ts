import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RouteActions } from "./RouteActions";
import { TalentApply } from "./TalentApply";

@Index("talent_apply_progress_pkey", ["taprId"], { unique: true })
@Entity("talent_apply_progress", { schema: "public" })
export class TalentApplyProgress {
  @PrimaryGeneratedColumn({ type: "integer", name: "tapr_id" })
  taprId: number;

  @Column("timestamp without time zone", {
    name: "tapr_modified_date",
    nullable: true,
  })
  taprModifiedDate: Date | null;

  @Column("character varying", {
    name: "tapr_status",
    nullable: true,
    length: 15,
  })
  taprStatus: string | null;

  @Column("character varying", {
    name: "tapr_comment",
    nullable: true,
    length: 256,
  })
  taprComment: string | null;

  @ManyToOne(
    () => RouteActions,
    (routeActions) => routeActions.talentApplyProgresses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "tapr_roac_id", referencedColumnName: "roacId" }])
  taprRoac: RouteActions;

  @ManyToOne(
    () => TalentApply,
    (talentApply) => talentApply.talentApplyProgresses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "tapr_taap_id", referencedColumnName: "taapId" }])
  taprTaap: TalentApply;
}
