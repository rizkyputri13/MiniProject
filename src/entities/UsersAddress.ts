import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Address } from "./Address";
import { AddressType } from "./AddressType";
import { Users } from "./Users";

@Index("users_address_pkey", ["etadAddrId"], { unique: true })
@Entity("users_address", { schema: "public" })
export class UsersAddress {
  @Column("integer", { primary: true, name: "etad_addr_id" })
  etadAddrId: number;

  @Column("timestamp without time zone", {
    name: "etad_modified_date",
    nullable: true,
  })
  etadModifiedDate: Date | null;

  @OneToOne(() => Address, (address) => address.usersAddress, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "etad_addr_id", referencedColumnName: "addrId" }])
  etadAddr: Address;

  @ManyToOne(() => AddressType, (addressType) => addressType.usersAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "etad_adty_id", referencedColumnName: "adtyId" }])
  etadAdty: AddressType;

  @ManyToOne(() => Users, (users) => users.usersAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "etad_entity_id", referencedColumnName: "userEntityId" },
  ])
  etadEntity: Users;
}
