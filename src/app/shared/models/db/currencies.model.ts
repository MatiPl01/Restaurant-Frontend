// TODO

export class Currencies {
    constructor(
        public symbols: { currency: string, symbol: string }[],
        public mainCurrency: string,
        public exchangeRates: { from: string, to: string, ratio: number }[]
    ) {}
}
