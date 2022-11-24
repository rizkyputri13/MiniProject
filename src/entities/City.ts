import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Province } from "./Province";
import { ProgramEntity } from "./ProgramEntity";
import { UserAccounts } from "./UserAccounts";
import { UsersExperiences } from "./UsersExperiences";

@Index("city_pkey", ["cityId"], { unique: true })
@Index("city_city_name_key", ["cityName"], { unique: true })
@Entity("city", { schema: "public" })
export class City {
  @PrimaryGeneratedColumn({ type: "integer", name: "city_id" })
  cityId: number;

  @Column("character varying", { name: "city_name", unique: true, length: 155 })
  cityName: string;

  @Column("timestamp without time zone", {
    name: "city_modified_date",
    nullable: true,
  })
  cityModifiedDate: Date | null;

  @OneToMany(() => Address, (address) => address.addrCity)
  addresses: Address[];

  @ManyToOne(() => Province, (province) => province.cities, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "city_prov_id", referencedColumnName: "provId" }])
  cityProv: Province;

  @OneToMany(() => ProgramEntity, (programEntity) => programEntity.progCity)
  programEntities: ProgramEntity[];

  @OneToMany(() => UserAccounts, (userAccounts) => userAccounts.usacBranchCity)
  userAccounts: UserAccounts[];

  @OneToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usexCity
  )
  usersExperiences: UsersExperiences[];
}
