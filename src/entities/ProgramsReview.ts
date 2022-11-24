import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { ProgramEntity } from "./ProgramEntity";

@Index("programs_review_pkey", ["poreEntityId", "poreProgId"], { unique: true })
@Entity("programs_review", { schema: "public" })
export class ProgramsReview {
  @Column("integer", { primary: true, name: "pore_prog_id" })
  poreProgId: number;

  @Column("integer", { primary: true, name: "pore_entity_id" })
  poreEntityId: number;

  @Column("character varying", {
    name: "bore_review",
    nullable: true,
    length: 512,
  })
  boreReview: string | null;

  @Column("integer", { name: "bore_rating", nullable: true })
  boreRating: number | null;

  @Column("date", { name: "bore_modified_date", nullable: true })
  boreModifiedDate: string | null;

  @ManyToOne(() => Users, (users) => users.programsReviews)
  @JoinColumn([
    { name: "pore_entity_id", referencedColumnName: "userEntityId" },
  ])
  poreEntity: Users;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programsReviews
  )
  @JoinColumn([{ name: "pore_prog_id", referencedColumnName: "progId" }])
  poreProg: ProgramEntity;
}
