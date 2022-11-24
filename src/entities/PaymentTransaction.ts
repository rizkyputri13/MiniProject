import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { UserAccounts } from "./UserAccounts";

@Index("payment_transaction_pkey", ["patrId"], { unique: true })
@Index("payment_transaction_patr_trx_number_key", ["patrTrxNumber"], {
  unique: true,
})
@Index("payment_transaction_patr_trx_number_ref_key", ["patrTrxNumberRef"], {
  unique: true,
})
@Entity("payment_transaction", { schema: "public" })
export class PaymentTransaction {
  @PrimaryGeneratedColumn({ type: "integer", name: "patr_id" })
  patrId: number;

  @Column("character varying", {
    name: "patr_trx_number",
    nullable: true,
    unique: true,
    length: 55,
  })
  patrTrxNumber: string | null;

  @Column("numeric", { name: "patr_debet", nullable: true })
  patrDebet: string | null;

  @Column("numeric", { name: "patr_credit", nullable: true })
  patrCredit: string | null;

  @Column("character varying", {
    name: "patr_type",
    nullable: true,
    length: 15,
  })
  patrType: string | null;

  @Column("character varying", {
    name: "patr_note",
    nullable: true,
    length: 255,
  })
  patrNote: string | null;

  @Column("timestamp without time zone", {
    name: "patr_modified_date",
    nullable: true,
  })
  patrModifiedDate: Date | null;

  @Column("character varying", {
    name: "patr_trx_number_ref",
    nullable: true,
    unique: true,
    length: 55,
  })
  patrTrxNumberRef: string | null;

  @ManyToOne(() => Users, (users) => users.paymentTransactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "patr_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  patrUserEntity: Users;

  @ManyToOne(
    () => UserAccounts,
    (userAccounts) => userAccounts.paymentTransactions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "patr_source_id", referencedColumnName: "usacAccountNumber" },
  ])
  patrSource: UserAccounts;

  @ManyToOne(
    () => UserAccounts,
    (userAccounts) => userAccounts.paymentTransactions2,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "patr_target_id", referencedColumnName: "usacAccountNumber" },
  ])
  patrTarget: UserAccounts;
}
