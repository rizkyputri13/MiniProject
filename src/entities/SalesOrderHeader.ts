import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SalesOrderDetail } from "./SalesOrderDetail";
import { Address } from "./Address";
import { Status } from "./Status";
import { Users } from "./Users";

@Index("sales_order_header_pkey", ["soheId", "soheStudentEntityId"], {
  unique: true,
})
@Index("sales_order_header_sohe_id_key", ["soheId"], { unique: true })
@Index("sales_order_header_sohe_order_number_key", ["soheOrderNumber"], {
  unique: true,
})
@Entity("sales_order_header", { schema: "public" })
export class SalesOrderHeader {
  @PrimaryGeneratedColumn({ type: "integer", name: "sohe_id" })
  soheId: number;

  @Column("integer", { primary: true, name: "sohe_student_entity_id" })
  soheStudentEntityId: number;

  @Column("integer", { name: "sohe_revision_number", nullable: true })
  soheRevisionNumber: number | null;

  @Column("timestamp without time zone", {
    name: "sohe_order_date",
    nullable: true,
  })
  soheOrderDate: Date | null;

  @Column("timestamp without time zone", {
    name: "sohe_due_date",
    nullable: true,
  })
  soheDueDate: Date | null;

  @Column("timestamp without time zone", {
    name: "sohe_ship_date",
    nullable: true,
  })
  soheShipDate: Date | null;

  @Column("character varying", {
    name: "sohe_order_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  soheOrderNumber: string | null;

  @Column("character varying", {
    name: "sohe_account_number",
    nullable: true,
    length: 25,
  })
  soheAccountNumber: string | null;

  @Column("character varying", {
    name: "sohe_patr_trx_number",
    nullable: true,
    length: 25,
  })
  sohePatrTrxNumber: string | null;

  @Column("numeric", { name: "sohe_subtotal", nullable: true })
  soheSubtotal: string | null;

  @Column("numeric", { name: "sohe_tax", nullable: true })
  soheTax: string | null;

  @Column("numeric", { name: "sohe_total_discount", nullable: true })
  soheTotalDiscount: string | null;

  @Column("numeric", { name: "sohe_total_due", nullable: true })
  soheTotalDue: string | null;

  @Column("character varying", {
    name: "sohe_comment",
    nullable: true,
    length: 255,
  })
  soheComment: string | null;

  @Column("character varying", {
    name: "sohe_access_token",
    nullable: true,
    length: 255,
  })
  soheAccessToken: string | null;

  @Column("timestamp without time zone", {
    name: "sohe_modified_date",
    nullable: true,
  })
  soheModifiedDate: Date | null;

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.sodeSohe
  )
  salesOrderDetails: SalesOrderDetail[];

  @ManyToOne(() => Address, (address) => address.salesOrderHeaders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sohe_ship_address", referencedColumnName: "addrId" }])
  soheShipAddress: Address;

  @ManyToOne(() => Status, (status) => status.salesOrderHeaders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sohe_status", referencedColumnName: "status" }])
  soheStatus: Status;

  @ManyToOne(() => Users, (users) => users.salesOrderHeaders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "sohe_student_entity_id", referencedColumnName: "userEntityId" },
  ])
  soheStudentEntity: Users;
}
