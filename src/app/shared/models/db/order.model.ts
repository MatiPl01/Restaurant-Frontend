// TODO

import { DishSchema } from "../../schemas/db/dish.schema";
import { OrderSchema } from "../../schemas/db/order.schema";

export class Order {
    public _id!: string
    public date!: Date
    public dishes!: { dish: DishSchema, quantity: number }[]
    public currency!: string
    public amount!: number

    constructor(orderData: OrderSchema) {
        Object.assign(this, orderData)
    }
}