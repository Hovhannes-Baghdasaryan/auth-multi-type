import {param, query} from "express-validator";

export const getAllUsersValidator = [
    query('per_page').isNumeric().withMessage('per_page must be number'),
    query('page').isNumeric().withMessage('page must be number')
]

export const getSingleUserValidator = [
    param('id').isNumeric().withMessage("id must be number"),
]
