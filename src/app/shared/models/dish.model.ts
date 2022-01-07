import { ImageEntry } from "./image-entry.model";
import { Review } from "./review.model";

export interface Dish {
    id: number,
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
    description: string,
    images: {
        coverIdx: 0,
        gallery: ImageEntry[]
    },
    reviews: Review[]
}
