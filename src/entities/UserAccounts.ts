import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PaymentTransaction } from "./PaymentTransaction";
import { City } from "./City";
import { Entities } from "./Entities";
import { Users } from "./Users";

@Index("user_accounts_usac_account_number_key", ["usacAccountNumber"], {
  unique: true,
})
@Index("user_accounts_pkey", ["usacEntityId", "usacUserEntityId"], {
  unique: true,
})
@Entity("user_accounts", { schema: "public" })
export class UserAccounts {
  @Column("integer", { primary: true, name: "usac_entity_id" })
  usacEntityId: number;

  @Column("integer", { primary: true, name: "usac_user_entity_id" })
  usacUserEntityId: number;

  @Column("character varying", {
    name: "usac_account_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  usacAccountNumber: string | null;

  @Column("numeric", { name: "usac_saldo", nullable: true })
  usacSaldo: string | null;

  @Column("character varying", {
    name: "usac_type",
    nullable: true,
    length: 15,
  })
  usacType: string | null;

  @Column("date", { name: "usac_start_date", nullable: true })
  usacStartDate: string | null;

  @Column("date", { name: "usac_end_date", nullable: true })
  usacEndDate: string | null;

  @Column("timestamp without time zone", {
    name: "usac_modified_date",
    nullable: true,
  })
  usacModifiedDate: Date | null;

  @Column("character varying", {
    name: "usac_branch",
    nullable: true,
    length: 25,
  })
  usacBranch: string | null;

  @OneToMany(
    () => PaymentTransaction,
    (paymentTransaction) => paymentTransaction.patrSource
  )
  paymentTransactions: PaymentTransaction[];

  @OneToMany(
    () => PaymentTransaction,
    (paymentTransaction) => paymentTransaction.patrTarget
  )
  paymentTransactions2: PaymentTransaction[];

  @ManyToOne(() => City, (city) => city.userAccounts)
  @JoinColumn([{ name: "usac_branch_city", referencedColumnName: "cityId" }])
  usacBranchCity: City;

  @ManyToOne(() => Entities, (entities) => entities.userAccounts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usac_entity_id", referencedColumnName: "entityId" }])
  usacEntity: Entities;

  @ManyToOne(() => Users, (users) => users.userAccounts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "usac_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  usacUserEntity: Users;
}
