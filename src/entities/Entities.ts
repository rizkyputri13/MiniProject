import {
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './Bank';
import { UserAccounts } from './UserAccounts';
import { Users } from './Users';

@Index('entities_pkey', ['entityId'], { unique: true })
@Entity('entities', { schema: 'public' })
export class Entities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'entity_id' })
  entityId: number;

  @OneToOne(() => Bank, (bank) => bank.bankEntity)
  bank: Bank;

  @OneToMany(() => UserAccounts, (userAccounts) => userAccounts.usacEntity)
  userAccounts: UserAccounts[];

  @OneToOne(() => Users, (users) => users.userEntity)
  users: Users;
}
