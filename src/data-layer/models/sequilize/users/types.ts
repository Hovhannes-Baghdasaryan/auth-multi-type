import {Model, Optional} from "sequelize";

export interface UserAttributes {
    id: number;
    username: string;
    first_name: string | null;
    last_name: string | null;
    otp?: string | null;
    isVerified?: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}