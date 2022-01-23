import { Injectable, EventEmitter } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Dish } from "../shared/models/db/dish.model"
import { AuthService } from "./auth.service"
import { WebRequestService } from "./web-request.service"
import { Observable, tap, first, MonoTypeOperatorFunction } from "rxjs"
import { Currencies } from "../shared/models/db/currencies.model"

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    defaultCallback: Function = (data: any) => data
    // This is a default event emiter which will emit events that
    // don't get caught by any component
    trapEvent = new EventEmitter<any>()
    dishChangedEvent = new EventEmitter<Dish>()
    dishesChangedEvent = new EventEmitter<Dish[]>()
    currenciesChangedEvent = new EventEmitter<Currencies>()

    constructor(private webRequestService: WebRequestService,
                private authService: AuthService) {}

    // CURRENCIES
    fetchCurrencies(callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest('currencies', callback, this.trapEvent, watch)
    }

    // DISHES
    fetchDishes(callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest('dishes', callback, this.dishesChangedEvent, watch)
    }

    fetchDish(id: string, callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest(`dishes/${id}`, callback, this.dishChangedEvent, watch)
    }

    removeDish(id: string, callback: Function = this.defaultCallback): Observable<any> {
        return this.makeDeleteRequest(`dishes/${id}`, callback)
    }

    addDish(dish: Dish, callback: Function = this.defaultCallback): Observable<any> {
        return this.makePostRequest('dishes', dish, callback, this.dishChangedEvent)
    }

    private makeGetRequest(url: string, callback: Function, emitter: EventEmitter<any> = this.trapEvent, watch: boolean = true): Observable<any> {
        if (watch) {
            return this.webRequestService
                .get(url)
                .pipe(tap((res: HttpResponse<any>) => {
                    // @ts-ignore
                    const data = callback(res.data) || res.data
                    emitter.emit(data)
                })
            )
        } else {
            return this.webRequestService
                .get(url)
                .pipe(
                    first(),
                    tap((res: HttpResponse<any>) => {
                        // @ts-ignore
                        const data = callback(res.data) || res.data
                        emitter.emit(data)
                    }
                )
            )
        }
    }

    private makeDeleteRequest(url: string, callback: Function, emitter: EventEmitter<any> = this.trapEvent): Observable<any> {
        return this.webRequestService
            .delete(url)
            .pipe(
                first(), 
                tap((res: HttpResponse<any>) => {
                    // @ts-ignore
                    const data = callback(res.data) || res.data
                    emitter.emit(data)
                }
            )
        )
    }

    private makePostRequest(url: string, data: any, callback: Function, emitter: EventEmitter<any> = this.trapEvent): Observable<any> {
        return this.webRequestService
            .post(url, data)
            .pipe(
                first(),
                tap((res: HttpResponse<any>) => {
                // @ts-ignore
                const data = callback(res.data) || res.data
                emitter.emit(data)
            })
        )
    }
}
