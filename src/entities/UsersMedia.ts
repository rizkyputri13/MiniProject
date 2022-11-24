import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("users_media_pkey", ["usmeEntityId", "usmeId"], { unique: true })
@Entity("users_media", { schema: "public" })
export class UsersMedia {
  @PrimaryGeneratedColumn({ type: "integer", name: "usme_id" })
  usmeId: number;

  @Column("integer", { primary: true, name: "usme_entity_id" })
  usmeEntityId: number;

  @Column("character varying", { name: "usme_file_link", length: 255 })
  usmeFileLink: string;

  @Column("character varying", { name: "usme_filename", length: 55 })
  usmeFilename: string;

  @Column("integer", { name: "usme_filesize" })
  usmeFilesize: number;

  @Column("character varying", { name: "usme_filetype", length: 15 })
  usmeFiletype: string;

  @Column("character varying", {
    name: "usme_note",
    nullable: true,
    length: 55,
  })
  usmeNote: string | null;

  @Column("timestamp without time zone", {
    name: "usme_modified_date",
    nullable: true,
  })
  usmeModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.usersMedias, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "usme_entity_id", referencedColumnName: "userEntityId" },
  ])
  usmeEntity: Users;
}
