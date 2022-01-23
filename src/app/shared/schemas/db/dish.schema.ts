import { ReviewSchema } from "./review.schema";

export interface DishSchema {
    _id: string,
    name: string,
    cuisine: string,
    type: string,
    category: string,
    ingredients: string[],
    stock: number,
    currency: string,
    unitPrice: number,
    rating: number,
    ratesCount: number,
    description: string[],
    images: {
        coverIdx: number,
        gallery: { breakpoints: number[], paths: string[] }[]
    },
    reviews: ReviewSchema[]
}
