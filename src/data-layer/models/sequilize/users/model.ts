import {DataTypes, Sequelize} from "sequelize";
import {UserInstance} from "./types.ts";

export default (sequelize: Sequelize) => {
    return sequelize.define<UserInstance>("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })
}

