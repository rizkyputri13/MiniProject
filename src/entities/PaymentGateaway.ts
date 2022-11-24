import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("payment_gateaway_paga_code_key", ["pagaCode"], { unique: true })
@Index("payment_gateaway_pkey", ["pagaEntityId"], { unique: true })
@Index("payment_gateaway_paga_name_key", ["pagaName"], { unique: true })
@Index("payment_gateaway_paga_virtual_account_key", ["pagaVirtualAccount"], {
  unique: true,
})
@Entity("payment_gateaway", { schema: "public" })
export class PaymentGateaway {
  @Column("integer", { primary: true, name: "paga_entity_id" })
  pagaEntityId: number;

  @Column("character varying", {
    name: "paga_code",
    nullable: true,
    unique: true,
    length: 10,
  })
  pagaCode: string | null;

  @Column("character varying", {
    name: "paga_name",
    nullable: true,
    unique: true,
    length: 55,
  })
  pagaName: string | null;

  @Column("character varying", {
    name: "paga_virtual_account",
    nullable: true,
    unique: true,
    length: 25,
  })
  pagaVirtualAccount: string | null;

  @Column("timestamp without time zone", {
    name: "paga_modified_date",
    nullable: true,
  })
  pagaModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.paymentGateaways, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "paga_owner_id", referencedColumnName: "userEntityId" }])
  pagaOwner: Users;
}
