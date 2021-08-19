import {
  Column,
  DataType,
  IsEmail,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table({
  tableName: "user",
  freezeTableName: true,
})
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  declare id: string;

  @ApiProperty({
    type: String,
  })
  @Unique
  @IsEmail
  @Column
  email: string;

  @ApiProperty({
    type: String,
  })
  @Column
  firstName: string;

  @ApiProperty({
    type: String,
  })
  @Column
  lastName: string;

  @Column(DataType.VIRTUAL)
  get fullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    } else if (this.firstName) {
      return `${this.firstName}`;
    } else if (this.lastName) {
      return `${this.lastName}`;
    } else {
      return "";
    }
  }

  @Column(DataType.VIRTUAL)
  get initials(): string {
    let initials = this.email?.charAt(0);
    if (this.firstName && this.lastName) {
      initials = `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`;
    } else if (this.firstName) {
      initials = `${this.firstName.charAt(0)}`;
    } else if (this.lastName) {
      initials = `${this.lastName.charAt(0)}`;
    }

    return initials?.toUpperCase();
  }

  @ApiProperty({
    type: String,
    description: "The Authentication ID",
  })
  @Column
  authId: string;

  @ApiProperty({
    type: Boolean,
    description: "If the user is active or not",
  })
  @Column({ defaultValue: true })
  active: boolean;

  @ApiProperty({
    type: Date,
    description: "When the user last logged in",
  })
  @Column
  lastLogin: Date;
}
