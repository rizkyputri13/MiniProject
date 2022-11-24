import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("users_education_pkey", ["usduEntityId", "usduId"], { unique: true })
@Entity("users_education", { schema: "public" })
export class UsersEducation {
  @PrimaryGeneratedColumn({ type: "integer", name: "usdu_id" })
  usduId: number;

  @PrimaryGeneratedColumn({ type: "integer", name: "usdu_entity_id" })
  usduEntityId: number;

  @Column("character varying", {
    name: "usdu_school",
    nullable: true,
    length: 255,
  })
  usduSchool: string | null;

  @Column("character varying", {
    name: "usdu_degree",
    nullable: true,
    length: 15,
  })
  usduDegree: string | null;

  @Column("character varying", {
    name: "usdu_field_study",
    nullable: true,
    length: 125,
  })
  usduFieldStudy: string | null;

  @Column("timestamp without time zone", {
    name: "usdu_start_date",
    nullable: true,
  })
  usduStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "usdu_end_date",
    nullable: true,
  })
  usduEndDate: Date | null;

  @Column("character varying", {
    name: "usdu_grade",
    nullable: true,
    length: 5,
  })
  usduGrade: string | null;

  @Column("character varying", {
    name: "usdu_activities",
    nullable: true,
    length: 512,
  })
  usduActivities: string | null;

  @Column("character varying", {
    name: "usdu_description",
    nullable: true,
    length: 512,
  })
  usduDescription: string | null;

  @Column("timestamp without time zone", {
    name: "usdu_modified_date",
    nullable: true,
  })
  usduModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.usersEducations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "usdu_entity_id", referencedColumnName: "userEntityId" },
  ])
  usduEntity: Users;
}
