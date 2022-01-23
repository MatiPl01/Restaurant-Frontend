import { OrderSchema } from "../../schemas/db/order.schema";
import { ReviewSchema } from "../../schemas/db/review.schema";
import { DishSchema } from "../../schemas/db/dish.schema";
import { UserSchema } from "../../schemas/db/user.schema";

export class User {
    private _id!: string
    private name!: string
    private email!: string
    private role!: string
    private banned!: boolean
    private orders!: OrderSchema[]
    private reviews!: ReviewSchema[]
    private cart!: { dish: DishSchema, quantity: number }[]
    private token!: string
    
    constructor(userData: UserSchema, token: string) {
        Object.assign(this, userData, { token })
    }

    // Return null if token is not valid
    getToken(): string {
        const { token, exp: expTimestamp } = this.parseToken()
        const currTimestamp = Math.floor((new Date).getTime() / 1000)
        return currTimestamp < expTimestamp ? token : null
    }

    private parseToken() {
        return JSON.parse(atob(this.token.split('.')[1]))
    }
}
