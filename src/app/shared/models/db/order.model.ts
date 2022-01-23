// TODO

import { DishSchema } from "../../schemas/db/dish.schema";

export class Order {
    constructor(
        public _id: string,
        public date: Date,
        public dishes: { dish: DishSchema, quantity: number }[],
        public currency: string,
        public amount: number
    ) {}
}