import { Column, Entity, Index, OneToMany } from 'typeorm';
import { SkillTemplate } from './SkillTemplate';
import { UsersSkill } from './UsersSkill';

@Index('skill_type_pkey', ['sktyName'], { unique: true })
@Entity('skill_type', { schema: 'public' })
export class SkillType {
  @Column('character varying', { primary: true, name: 'skty_name', length: 55 })
  sktyName: string;

  @OneToMany(() => SkillTemplate, (skillTemplate) => skillTemplate.sktyName)
  skillTemplates: SkillTemplate[];

  @OneToMany(() => UsersSkill, (usersSkill) => usersSkill.uskiSktyName)
  usersSkills: UsersSkill[];
}
