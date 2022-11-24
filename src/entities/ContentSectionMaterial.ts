import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentSection } from "./ContentSection";

@Index("content_section_material_pkey", ["cosmId"], { unique: true })
@Entity("content_section_material", { schema: "public" })
export class ContentSectionMaterial {
  @PrimaryGeneratedColumn({ type: "integer", name: "cosm_id" })
  cosmId: number;

  @Column("character varying", {
    name: "cosm_filename",
    nullable: true,
    length: 55,
  })
  cosmFilename: string | null;

  @Column("integer", { name: "cosm_filesize", nullable: true })
  cosmFilesize: number | null;

  @Column("character varying", {
    name: "cosm_filetype",
    nullable: true,
    length: 15,
  })
  cosmFiletype: string | null;

  @Column("character varying", {
    name: "cosm_filelink",
    nullable: true,
    length: 255,
  })
  cosmFilelink: string | null;

  @Column("timestamp without time zone", {
    name: "cosm_modified_date",
    nullable: true,
  })
  cosmModifiedDate: Date | null;

  @ManyToOne(
    () => ContentSection,
    (contentSection) => contentSection.contentSectionMaterials,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cosm_cose_id", referencedColumnName: "coseId" }])
  cosmCose: ContentSection;
}
