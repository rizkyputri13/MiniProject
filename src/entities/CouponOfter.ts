import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItems } from "./CartItems";
import { CouponOfterCourse } from "./CouponOfterCourse";
import { SalesOrderDetail } from "./SalesOrderDetail";

@Index("coupon_ofter_pkey", ["coofId"], { unique: true })
@Entity("coupon_ofter", { schema: "public" })
export class CouponOfter {
  @PrimaryGeneratedColumn({ type: "integer", name: "coof_id" })
  coofId: number;

  @Column("character varying", {
    name: "coof_description",
    nullable: true,
    length: 255,
  })
  coofDescription: string | null;

  @Column("numeric", { name: "coof_discount", nullable: true })
  coofDiscount: string | null;

  @Column("character varying", {
    name: "coof_status",
    nullable: true,
    length: 15,
  })
  coofStatus: string | null;

  @Column("timestamp without time zone", {
    name: "coof_start_date",
    nullable: true,
  })
  coofStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "coof_end_date",
    nullable: true,
  })
  coofEndDate: Date | null;

  @Column("integer", { name: "coof_min_qty", nullable: true })
  coofMinQty: number | null;

  @Column("integer", { name: "coof_max_qty", nullable: true })
  coofMaxQty: number | null;

  @Column("timestamp without time zone", {
    name: "coof_modified_date",
    nullable: true,
  })
  coofModifiedDate: Date | null;

  @ManyToOne(() => CartItems, (cartItems) => cartItems.couponOfters, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "coof_cate_id", referencedColumnName: "caitId" }])
  coofCate: CartItems;

  @OneToMany(
    () => CouponOfterCourse,
    (couponOfterCourse) => couponOfterCourse.sacaCoof
  )
  couponOfterCourses: CouponOfterCourse[];

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.sodeCoof
  )
  salesOrderDetails: SalesOrderDetail[];
}
