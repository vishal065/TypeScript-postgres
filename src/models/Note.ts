import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: Note.Note_Table_Name,
})
//
export class Note extends Model {
  public static Note_Table_Name = "note" as const;
  public static Note_ID = "id" as const;
  public static Note_Name = "name" as const;
  public static Note_Description = "description" as const;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Note.Note_ID,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    field: Note.Note_Name,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(225),
    field: Note.Note_Description,
  })
  declare description: string;
}
