// TODO

import { DishSchema } from "../../schemas/db/dish.schema";
import { ReviewSchema } from "../../schemas/db/review.schema";
import { UserSchema } from "../../schemas/db/user.schema";

export class Review {
    public user!: UserSchema
    public dish!: DishSchema
    public title!: string
    public body!: string[]
    public date!: string
    public rating!: number

    constructor(reviewData: ReviewSchema) {
        Object.assign(this, reviewData)
    }
}
