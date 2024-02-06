import {Model, Optional} from "sequelize";

interface UserAttributes {
    id: string;
    first_name: string;
    last_name: string;
}

interface AuthorCreationAttributes
    extends Optional<UserAttributes, 'id'> {
}

export interface AuthorInstance extends Model<UserAttributes, AuthorCreationAttributes>, UserAttributes {
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}