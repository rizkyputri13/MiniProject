import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { Courses } from "./Courses";

@Index("instructor_course_pkey", ["incoEntityId", "incoId", "incoProgId"], {
  unique: true,
})
@Entity("instructor_course", { schema: "public" })
export class InstructorCourse {
  @PrimaryGeneratedColumn({ type: "integer", name: "inco_id" })
  incoId: number;

  @Column("integer", { primary: true, name: "inco_entity_id" })
  incoEntityId: number;

  @Column("integer", { primary: true, name: "inco_prog_id" })
  incoProgId: number;

  @Column("timestamp without time zone", {
    name: "inco_modified_date",
    nullable: true,
  })
  incoModifiedDate: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.instructorCourses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "inco_entity_id", referencedColumnName: "empEntityId" }])
  incoEntity: Employee;

  @ManyToOne(() => Courses, (courses) => courses.instructorCourses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "inco_prog_id", referencedColumnName: "corseProgId" }])
  incoProg: Courses;
}
