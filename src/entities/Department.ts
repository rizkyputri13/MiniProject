import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeDepartmentHistory } from "./EmployeeDepartmentHistory";

@Index("department_pkey", ["deptId"], { unique: true })
@Entity("department", { schema: "public" })
export class Department {
  @PrimaryGeneratedColumn({ type: "integer", name: "dept_id" })
  deptId: number;

  @Column("character varying", { name: "dept_name", length: 50 })
  deptName: string;

  @Column("timestamp without time zone", {
    name: "dept_modified_date",
    nullable: true,
  })
  deptModifiedDate: Date | null;

  @OneToMany(
    () => EmployeeDepartmentHistory,
    (employeeDepartmentHistory) => employeeDepartmentHistory.edhiDept
  )
  employeeDepartmentHistories: EmployeeDepartmentHistory[];
}
