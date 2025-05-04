import { Table, Column, Model, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'my_friends',
  timestamps: false,
})

export class Friend extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  gender!: string;
}