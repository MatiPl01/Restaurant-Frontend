// TODO

import { DishSchema } from "../../schemas/db/dish.schema";
import { OrderSchema } from "../../schemas/db/order.schema";
import { UserSchema } from "../../schemas/db/user.schema";

export class Order {
    public user!: UserSchema
    public date!: String
    public dishes!: { dish: DishSchema, quantity: number }[]
    public currency!: string
    public amount!: number

    constructor(orderData: OrderSchema) {
        Object.assign(this, orderData)
    }
}