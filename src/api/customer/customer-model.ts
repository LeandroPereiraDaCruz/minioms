import { Table, Column, DataType } from 'sequelize-typescript'
import { CustomerModel } from './customer-type';

@Table({
    tableName: 'customer',
    freezeTableName: true,
    timestamps: true
})
export class Customer extends CustomerModel {

  @Column({
      field: 'uuid',
      primaryKey: true,
      allowNull: false,
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
  })
  readonly uuid!: string;

  @Column({
    field: 'name',
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column({
    field: 'cpf',
    type: DataType.STRING(11),
    allowNull: true,
    unique: true
  })
  readonly cpf?: string;

  @Column({
    field: 'cnpj',
    type: DataType.STRING(14),
    allowNull: true,
    unique: true
  })
  readonly cnpj?: string;

  @Column({
    field: 'email',
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  readonly email!: string;

  @Column({
    field: 'phone',
    type: DataType.STRING(15),
    allowNull: true
  })
  phone?: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false
  })
  readonly createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false
  })
  readonly updatedAt: Date;
}