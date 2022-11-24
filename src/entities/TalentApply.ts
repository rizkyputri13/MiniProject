import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { JobPost } from "./JobPost";
import { TalentApplyProgress } from "./TalentApplyProgress";

@Index("talent_apply_pkey", ["taapId"], { unique: true })
@Entity("talent_apply", { schema: "public" })
export class TalentApply {
  @PrimaryGeneratedColumn({ type: "integer", name: "taap_id" })
  taapId: number;

  @Column("character varying", {
    name: "taap_intro",
    nullable: true,
    length: 512,
  })
  taapIntro: string | null;

  @Column("integer", { name: "taap_scoring", nullable: true })
  taapScoring: number | null;

  @Column("timestamp without time zone", {
    name: "taap_modified_date",
    nullable: true,
  })
  taapModifiedDate: Date | null;

  @Column("character varying", {
    name: "taap_status",
    nullable: true,
    length: 15,
  })
  taapStatus: string | null;

  @ManyToOne(() => Users, (users) => users.talentApplies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "taap_entity_id", referencedColumnName: "userEntityId" },
  ])
  taapEntity: Users;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.talentApplies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "taap_jopo_id", referencedColumnName: "jopoId" }])
  taapJopo: JobPost;

  @OneToMany(
    () => TalentApplyProgress,
    (talentApplyProgress) => talentApplyProgress.taprTaap
  )
  talentApplyProgresses: TalentApplyProgress[];
}
