import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentSection } from "./ContentSection";
import { Courses } from "./Courses";
import { StudentEvaluation } from "./StudentEvaluation";

@Index("contents_cont_id_key", ["contId"], { unique: true })
@Index("contents_pkey", ["contId", "contProgId"], { unique: true })
@Entity("contents", { schema: "public" })
export class Contents {
  @PrimaryGeneratedColumn({ type: "integer", name: "cont_id" })
  contId: number;

  @Column("integer", { primary: true, name: "cont_prog_id" })
  contProgId: number;

  @Column("character varying", {
    name: "cont_title",
    nullable: true,
    length: 100,
  })
  contTitle: string | null;

  @Column("character", { name: "cont_preview", nullable: true, length: 1 })
  contPreview: string | null;

  @Column("character varying", {
    name: "cont_description",
    nullable: true,
    length: 256,
  })
  contDescription: string | null;

  @Column("integer", { name: "cont_total_section", nullable: true })
  contTotalSection: number | null;

  @Column("integer", { name: "cont_total_lecture", nullable: true })
  contTotalLecture: number | null;

  @Column("integer", { name: "cont_total_minute", nullable: true })
  contTotalMinute: number | null;

  @Column("timestamp without time zone", {
    name: "cont_modified_date",
    nullable: true,
  })
  contModifiedDate: Date | null;

  @OneToMany(() => ContentSection, (contentSection) => contentSection.coseCont)
  contentSections: ContentSection[];

  @ManyToOne(() => Courses, (courses) => courses.contents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cont_prog_id", referencedColumnName: "corseProgId" }])
  contProg: Courses;

  @OneToMany(
    () => StudentEvaluation,
    (studentEvaluation) => studentEvaluation.stevCont
  )
  studentEvaluations: StudentEvaluation[];
}
