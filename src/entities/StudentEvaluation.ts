import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contents } from "./Contents";
import { Users } from "./Users";

@Index("student_evaluation_pkey", ["stevId"], { unique: true })
@Entity("student_evaluation", { schema: "public" })
export class StudentEvaluation {
  @PrimaryGeneratedColumn({ type: "integer", name: "stev_id" })
  stevId: number;

  @Column("integer", { name: "stev_score", nullable: true })
  stevScore: number | null;

  @Column("timestamp without time zone", { name: "stev_date", nullable: true })
  stevDate: Date | null;

  @Column("timestamp without time zone", {
    name: "stev_modified_date",
    nullable: true,
  })
  stevModifiedDate: Date | null;

  @ManyToOne(() => Contents, (contents) => contents.studentEvaluations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "stev_cont_id", referencedColumnName: "contId" }])
  stevCont: Contents;

  @ManyToOne(() => Users, (users) => users.studentEvaluations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "stev_entity_id", referencedColumnName: "userEntityId" },
  ])
  stevEntity: Users;
}
