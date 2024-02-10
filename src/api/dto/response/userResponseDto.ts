import {UserAttribute} from "../../../data-layer/models/sequilize/users/types.ts";
import {I_PaginatedResponse} from "../../../common/dto/pagination.ts";
import UserController from "../../controllers/userController.ts";

export class UserResponseDto {
    constructor(user: UserAttribute) {
        this.id = user.id
        this.username = user.username
        this.firstName = user.first_name
        this.lastName = user.last_name
    }

    id: number;
    username: string
    firstName: string | null;
    lastName: string | null;
}


export class AllUsersPaginatedDto {
    constructor(userPaginated: I_PaginatedResponse<UserAttribute>) {
        this.total = userPaginated.total
        this.items = userPaginated.items.map(user => new UserResponseDto(user))
    }

    total: number
    items: UserResponseDto[]
}
