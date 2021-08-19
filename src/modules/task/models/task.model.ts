import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/modules/user/model/user.model";
import * as moment from "moment";

@Table({
  tableName: "task",
  freezeTableName: true,
})
export class Task extends Model<Task> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  ownerId: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column
  description: string;

  @Column({
    type: DataType.DATE,
  })
  dueDate: Date;

  @Column(DataType.VIRTUAL)
  get dueDateFormatted(): string {
    let formatted: any;
    if (this.dueDate) {
      formatted = moment(this.dueDate).format("YYYY-MM-DD");
    }
    return formatted;
  }

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  done: boolean;

  /* Associations */
  @BelongsTo(() => User)
  owner: User;
}
