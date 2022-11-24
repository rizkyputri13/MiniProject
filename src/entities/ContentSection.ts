import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contents } from "./Contents";
import { ContentSectionMaterial } from "./ContentSectionMaterial";

@Index("content_section_pkey", ["coseId"], { unique: true })
@Entity("content_section", { schema: "public" })
export class ContentSection {
  @PrimaryGeneratedColumn({ type: "integer", name: "cose_id" })
  coseId: number;

  @Column("character varying", {
    name: "cose_title",
    nullable: true,
    length: 256,
  })
  coseTitle: string | null;

  @Column("character", { name: "cose_preview", nullable: true, length: 1 })
  cosePreview: string | null;

  @Column("character varying", {
    name: "cose_note",
    nullable: true,
    length: 256,
  })
  coseNote: string | null;

  @Column("integer", { name: "cose_minute", nullable: true })
  coseMinute: number | null;

  @Column("timestamp without time zone", {
    name: "cose_modified_date",
    nullable: true,
  })
  coseModifiedDate: Date | null;

  @ManyToOne(() => Contents, (contents) => contents.contentSections, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cose_cont_id", referencedColumnName: "contId" }])
  coseCont: Contents;

  @OneToMany(
    () => ContentSectionMaterial,
    (contentSectionMaterial) => contentSectionMaterial.cosmCose
  )
  contentSectionMaterials: ContentSectionMaterial[];
}
