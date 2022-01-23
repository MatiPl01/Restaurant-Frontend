// TODO

import { CurrenciesSchema } from "../../schemas/db/currencies.schema";

export class Currencies {
    public symbols!: { currency: string, symbol: string }[]
    public mainCurrency!: string
    public exchangeRates!: { from: string, to: string, ratio: number }[]

    constructor(currenciesData: CurrenciesSchema) {
        Object.assign(this, currenciesData)
    }
}
