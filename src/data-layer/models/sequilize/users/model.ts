import {DataTypes, Sequelize} from "sequelize";
import {AuthorInstance} from "./types.ts";

export default (sequelize: Sequelize) => {
    return sequelize.define<AuthorInstance>("Users", {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}

