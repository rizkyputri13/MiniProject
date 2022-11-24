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
import { SalesOrderHeader } from "./SalesOrderHeader";

@Index("sales_order_detail_pkey", ["sodeId"], { unique: true })
@Entity("sales_order_detail", { schema: "public" })
export class SalesOrderDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "sode_id" })
  sodeId: number;

  @Column("integer", { name: "sode_qty", nullable: true })
  sodeQty: number | null;

  @Column("numeric", { name: "sode_unit_price", nullable: true })
  sodeUnitPrice: string | null;

  @Column("numeric", { name: "sode_unit_price_discount", nullable: true })
  sodeUnitPriceDiscount: string | null;

  @Column("numeric", { name: "sode_line_total", nullable: true })
  sodeLineTotal: string | null;

  @Column("timestamp without time zone", {
    name: "sode_modified_date",
    nullable: true,
  })
  sodeModifiedDate: Date | null;

  @ManyToOne(
    () => CouponOfter,
    (couponOfter) => couponOfter.salesOrderDetails,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "sode_coof_id", referencedColumnName: "coofId" }])
  sodeCoof: CouponOfter;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.salesOrderDetails,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "sode_prog_id", referencedColumnName: "progId" }])
  sodeProg: ProgramEntity;

  @ManyToOne(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.salesOrderDetails,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "sode_sohe_id", referencedColumnName: "soheId" }])
  sodeSohe: SalesOrderHeader;
}
