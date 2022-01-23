import { OrderSchema } from "./order.schema"
import { ReviewSchema } from "./review.schema"
import { DishSchema } from "./dish.schema"

export interface UserSchema {
    _id: string,
    name: string,
    email: string,
    roles: string[],
    banned: boolean,
    orders: OrderSchema[],
    reviews: ReviewSchema[],
    cart: { dish: DishSchema, quantity: number }[]
}
