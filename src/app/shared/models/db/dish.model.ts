// TODO

import { DishSchema } from "../../schemas/db/dish.schema";
import { Review } from "./review.model";

export class Dish {
    public _id!: string
    public name!: string
    public cuisine!: string
    public type!: string
    public category!: string
    public ingredients!: string[]
    public stock!: number
    public currency!: string
    public unitPrice!: number
    public rating!: number
    public ratesCount!: number
    public description!: string[]
    public images!: {
        coverIdx: number,
        gallery: { breakpoints: number[], paths: string[] }[]
    }
    public reviews!: Review[]

    constructor(dishData: DishSchema) {
        Object.assign(this, dishData)
    }
}
