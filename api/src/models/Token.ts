import { AutoIncrement, Column, PrimaryKey, Table, Model, AllowNull, Unique, ForeignKey } from "sequelize-typescript";
import User from "./User";

@Table
class Token extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @Unique(true)
  @Column
  token: string;
}
export default Token;
