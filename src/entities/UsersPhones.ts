import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Users } from "./Users";
import { PhoneNumberType } from "./PhoneNumberType";

@Index("users_phones_pkey", ["uspoEntityId"], { unique: true })
@Entity("users_phones", { schema: "public" })
export class UsersPhones {
  @Column("integer", { primary: true, name: "uspo_entity_id" })
  uspoEntityId: number;

  @Column("character varying", { name: "uspo_number", length: 15 })
  uspoNumber: string;

  @Column("timestamp without time zone", {
    name: "uspo_modified_date",
    nullable: true,
  })
  uspoModifiedDate: Date | null;

  @OneToOne(() => Users, (users) => users.usersPhones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "uspo_entity_id", referencedColumnName: "userEntityId" },
  ])
  uspoEntity: Users;

  @ManyToOne(
    () => PhoneNumberType,
    (phoneNumberType) => phoneNumberType.usersPhones,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "uspo_ponty_code", referencedColumnName: "pontyCode" }])
  uspoPontyCode: PhoneNumberType;
}
