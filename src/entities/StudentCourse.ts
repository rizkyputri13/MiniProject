import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Courses } from "./Courses";

@Index("student_course_pkey", ["studEntityId", "studProgId"], { unique: true })
@Entity("student_course", { schema: "public" })
export class StudentCourse {
  @Column("integer", { primary: true, name: "stud_prog_id" })
  studProgId: number;

  @Column("integer", { primary: true, name: "stud_entity_id" })
  studEntityId: number;

  @Column("timestamp without time zone", {
    name: "stud_start_date",
    nullable: true,
  })
  studStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "stud_end_date",
    nullable: true,
  })
  studEndDate: Date | null;

  @Column("character", { name: "stud_certificated", nullable: true, length: 1 })
  studCertificated: string | null;

  @Column("character varying", {
    name: "stud_certificate_link",
    nullable: true,
    length: 255,
  })
  studCertificateLink: string | null;

  @Column("timestamp without time zone", {
    name: "stud_modified_date",
    nullable: true,
  })
  studModifiedDate: Date | null;

  @Column("character varying", {
    name: "stud_access_token",
    nullable: true,
    length: 255,
  })
  studAccessToken: string | null;

  @Column("character", { name: "stud_access_grant", nullable: true, length: 1 })
  studAccessGrant: string | null;

  @Column("character varying", {
    name: "stud_status",
    nullable: true,
    length: 15,
  })
  studStatus: string | null;

  @ManyToOne(() => Users, (users) => users.studentCourses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "stud_entity_id", referencedColumnName: "userEntityId" },
  ])
  studEntity: Users;

  @ManyToOne(() => Courses, (courses) => courses.studentCourses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "stud_prog_id", referencedColumnName: "corseProgId" }])
  studProg: Courses;
}
