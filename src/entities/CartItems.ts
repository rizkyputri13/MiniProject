import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { ProgramEntity } from "./ProgramEntity";
import { CouponOfter } from "./CouponOfter";

@Index("cart_items_pkey", ["caitId"], { unique: true })
@Entity("cart_items", { schema: "public" })
export class CartItems {
  @PrimaryGeneratedColumn({ type: "integer", name: "cait_id" })
  caitId: number;

  @Column("integer", { name: "cait_quantity", nullable: true })
  caitQuantity: number | null;

  @Column("timestamp without time zone", {
    name: "cait_modified_date",
    nullable: true,
  })
  caitModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.cartItems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "cait_entity_id", referencedColumnName: "userEntityId" },
  ])
  caitEntity: Users;

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.cartItems, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cait_prog_id", referencedColumnName: "progId" }])
  caitProg: ProgramEntity;

  @OneToMany(() => CouponOfter, (couponOfter) => couponOfter.coofCate)
  couponOfters: CouponOfter[];
}
