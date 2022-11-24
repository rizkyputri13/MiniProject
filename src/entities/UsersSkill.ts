import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersExperiences } from "./UsersExperiences";
import { Users } from "./Users";
import { SkillType } from "./SkillType";

@Index("users_skill_pkey", ["uskiId"], { unique: true })
@Entity("users_skill", { schema: "public" })
export class UsersSkill {
  @PrimaryGeneratedColumn({ type: "integer", name: "uski_id" })
  uskiId: number;

  @Column("timestamp without time zone", {
    name: "uski_modified_date",
    nullable: true,
  })
  uskiModifiedDate: Date | null;

  @ManyToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usersSkills
  )
  usersExperiences: UsersExperiences[];

  @ManyToOne(() => Users, (users) => users.usersSkills, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "uski_entity_id", referencedColumnName: "userEntityId" },
  ])
  uskiEntity: Users;

  @ManyToOne(() => SkillType, (skillType) => skillType.usersSkills, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uski_skty_name", referencedColumnName: "sktyName" }])
  uskiSktyName: SkillType;
}
