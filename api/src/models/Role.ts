import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  AllowNull,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import UserRoles from "./UserRoles";
import User from "./User";

@Table
class Role extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column
  role: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
export default Role;
