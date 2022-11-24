import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Courses } from "./Courses";

@Index("course_review_pkey", ["coreEntityId", "coreProgId"], { unique: true })
@Entity("course_review", { schema: "public" })
export class CourseReview {
  @PrimaryGeneratedColumn({ type: "integer", name: "core_prog_id" })
  coreProgId: number;

  @Column("integer", { primary: true, name: "core_entity_id" })
  coreEntityId: number;

  @Column("character varying", {
    name: "core_review",
    nullable: true,
    length: 512,
  })
  coreReview: string | null;

  @Column("integer", { name: "core_rating", nullable: true })
  coreRating: number | null;

  @Column("timestamp without time zone", {
    name: "core_modified_date",
    nullable: true,
  })
  coreModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.courseReviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "core_entity_id", referencedColumnName: "userEntityId" },
  ])
  coreEntity: Users;

  @ManyToOne(() => Courses, (courses) => courses.courseReviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "core_prog_id", referencedColumnName: "corseProgId" }])
  coreProg: Courses;
}
