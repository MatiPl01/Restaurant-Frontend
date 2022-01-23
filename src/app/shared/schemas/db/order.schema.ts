import { DishSchema } from "./dish.schema";

export interface OrderSchema {
    _id: string,
    date: Date,
    dishes: { dish: DishSchema, quantity: number }[],
    currency: string,
    amount: number
}
