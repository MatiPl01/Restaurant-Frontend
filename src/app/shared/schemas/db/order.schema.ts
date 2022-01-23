import { DishSchema } from "./dish.schema";
import { UserSchema } from "./user.schema";

export interface OrderSchema {
    userID: UserSchema,
    date: string,
    dishes: { dish: DishSchema, quantity: number }[],
    currency: string,
    amount: number
}
