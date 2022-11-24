import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeClientContract } from "./EmployeeClientContract";
import { JobPost } from "./JobPost";

@Index("job_type_pkey", ["jotyId"], { unique: true })
@Entity("job_type", { schema: "public" })
export class JobType {
  @PrimaryGeneratedColumn({ type: "integer", name: "joty_id" })
  jotyId: number;

  @Column("character varying", {
    name: "joty_name",
    nullable: true,
    length: 56,
  })
  jotyName: string | null;

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoJoty
  )
  employeeClientContracts: EmployeeClientContract[];

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoJoty)
  jobPosts: JobPost[];
}
