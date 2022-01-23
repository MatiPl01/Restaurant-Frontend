// TODO

import { DishSchema } from "../../schemas/db/dish.schema";
import { UserSchema } from "../../schemas/db/user.schema";

export class Review {
    constructor(
        public user: UserSchema,
        public dish: DishSchema,
        public title: string,
        public body: string[],
        public date: string,
        public rating: number
    ) {}
}
