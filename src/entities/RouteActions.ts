import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BootcampApplyProgress } from "./BootcampApplyProgress";
import { Modules } from "./Modules";
import { TalentApplyProgress } from "./TalentApplyProgress";

@Index("route_actions_pkey", ["roacId"], { unique: true })
@Entity("route_actions", { schema: "public" })
export class RouteActions {
  @PrimaryGeneratedColumn({ type: "integer", name: "roac_id" })
  roacId: number;

  @Column("character varying", {
    name: "roac_name",
    nullable: true,
    length: 50,
  })
  roacName: string | null;

  @Column("integer", { name: "roac_orderby", nullable: true })
  roacOrderby: number | null;

  @Column("character", { name: "roac_display", nullable: true, length: 1 })
  roacDisplay: string | null;

  @OneToMany(
    () => BootcampApplyProgress,
    (bootcampApplyProgress) => bootcampApplyProgress.baprRoac
  )
  bootcampApplyProgresses: BootcampApplyProgress[];

  @ManyToOne(() => Modules, (modules) => modules.routeActions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "roac_module_name", referencedColumnName: "moduleName" },
  ])
  roacModuleName: Modules;

  @OneToMany(
    () => TalentApplyProgress,
    (talentApplyProgress) => talentApplyProgress.taprRoac
  )
  talentApplyProgresses: TalentApplyProgress[];
}
