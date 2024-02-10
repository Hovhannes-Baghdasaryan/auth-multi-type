import {Model, Optional} from "sequelize";

export interface UserAttribute {
    id: number;
    username: string;
    first_name: string | null;
    last_name: string | null;
    otp?: string | null;
    isVerified?: boolean;
}

type UserCreationAttributes = Optional<UserAttribute, 'id'>;

export interface UserInstance extends Model<UserAttribute, UserCreationAttributes>, UserAttribute {
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}