import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CouponOfter } from "./CouponOfter";
import { ProgramEntity } from "./ProgramEntity";

@Index("coupon_ofter_course_pkey", ["sacaCoofId", "sacaProgId"], {
  unique: true,
})
@Entity("coupon_ofter_course", { schema: "public" })
export class CouponOfterCourse {
  @PrimaryGeneratedColumn({ type: "integer", name: "saca_coof_id" })
  sacaCoofId: number;

  @Column("integer", { primary: true, name: "saca_prog_id" })
  sacaProgId: number;

  @Column("timestamp without time zone", {
    name: "saca_modified_date",
    nullable: true,
  })
  sacaModifiedDate: Date | null;

  @ManyToOne(
    () => CouponOfter,
    (couponOfter) => couponOfter.couponOfterCourses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "saca_coof_id", referencedColumnName: "coofId" }])
  sacaCoof: CouponOfter;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.couponOfterCourses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "saca_prog_id", referencedColumnName: "progId" }])
  sacaProg: ProgramEntity;
}
