
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "./db";



export interface UserAttributes extends Model{
  username: string;
  email: string;
  password: string;
  token: string;
  id: number;
}

export const User = sequelize.define('User',{
  username: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
});

User.sync({alter:true})

