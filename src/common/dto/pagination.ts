export interface I_Pagination {
    per_page?: number;
    page?: number
}

export interface I_PaginatedResponse<T> {
    total: number;
    items: T[]
}