import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SkillType } from "./SkillType";

@Index("skill_template_pkey", ["skteId"], { unique: true })
@Entity("skill_template", { schema: "public" })
export class SkillTemplate {
  @PrimaryGeneratedColumn({ type: "integer", name: "skte_id" })
  skteId: number;

  @Column("character varying", {
    name: "skte_skill",
    nullable: true,
    length: 256,
  })
  skteSkill: string | null;

  @Column("character varying", {
    name: "skte_description",
    nullable: true,
    length: 256,
  })
  skteDescription: string | null;

  @Column("integer", { name: "skte_week", nullable: true })
  skteWeek: number | null;

  @Column("integer", { name: "skte_orderby", nullable: true })
  skteOrderby: number | null;

  @Column("timestamp without time zone", {
    name: "skte_modified_date",
    nullable: true,
  })
  skteModifiedDate: Date | null;

  @Column("character varying", {
    name: "skte_module",
    nullable: true,
    length: 125,
  })
  skteModule: string | null;

  @ManyToOne(
    () => SkillTemplate,
    (skillTemplate) => skillTemplate.skillTemplates,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "skte_skte_id", referencedColumnName: "skteId" }])
  skteSkte: SkillTemplate;

  @OneToMany(() => SkillTemplate, (skillTemplate) => skillTemplate.skteSkte)
  skillTemplates: SkillTemplate[];

  @ManyToOne(() => SkillType, (skillType) => skillType.skillTemplates, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "skty_name", referencedColumnName: "sktyName" }])
  sktyName: SkillType;
}
