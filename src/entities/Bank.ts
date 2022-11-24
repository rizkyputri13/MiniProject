import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Entities } from "./Entities";

@Index("bank_bank_code_key", ["bankCode"], { unique: true })
@Index("bank_pkey", ["bankEntityId"], { unique: true })
@Index("bank_bank_name_key", ["bankName"], { unique: true })
@Entity("bank", { schema: "public" })
export class Bank {
  @Column("integer", { primary: true, name: "bank_entity_id" })
  bankEntityId: number;

  @Column("character varying", {
    name: "bank_code",
    nullable: true,
    unique: true,
    length: 10,
  })
  bankCode: string | null;

  @Column("character varying", {
    name: "bank_name",
    nullable: true,
    unique: true,
    length: 55,
  })
  bankName: string | null;

  @Column("timestamp without time zone", {
    name: "bank_modified_date",
    nullable: true,
  })
  bankModifiedDate: Date | null;

  @OneToOne(() => Entities, (entities) => entities.bank, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "bank_entity_id", referencedColumnName: "entityId" }])
  bankEntity: Entities;
}
