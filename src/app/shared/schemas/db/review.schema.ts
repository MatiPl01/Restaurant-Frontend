import { DishSchema } from "./dish.schema";
import { UserSchema } from "./user.schema";

export interface ReviewSchema {
    user: UserSchema,
    dish: DishSchema,
    title: string,
    body: string[],
    date: string,
    rating: number
}
