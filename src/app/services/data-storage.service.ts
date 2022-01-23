import { Injectable, EventEmitter } from "@angular/core"
import { HttpResponse, HttpHeaders } from "@angular/common/http"
import { Dish } from "../shared/models/db/dish.model"
import { WebRequestService } from "./web-request.service"
import { Observable, tap, first } from "rxjs"
import { Currencies } from "../shared/models/db/currencies.model"
import { Config } from "../shared/models/db/config.model"

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    defaultCallback: Function = (data: any) => data
    // This is a default event emiter which will emit events that
    // don't get caught by any component
    trapEvent = new EventEmitter<any>()
    configChangedEvent = new EventEmitter<Config>()
    dishChangedEvent = new EventEmitter<Dish>()
    dishesChangedEvent = new EventEmitter<Dish[]>()
    currenciesChangedEvent = new EventEmitter<Currencies>()

    constructor(private webRequestService: WebRequestService) {}

    // CONFIG
    fetchConfig(callback: Function = this.defaultCallback, watch: boolean = true) {
        return this.makeGetRequest(
            'config', 
            (data: any) => new Config(data), 
            callback, 
            this.configChangedEvent, 
            watch
        )
    }

    updateConfig(config: Config, callback: Function = this.defaultCallback) {
        return this.makePatchRequest(
            'config', 
            (data: any) => new Config(data), 
            config, 
            callback, 
            this.configChangedEvent
        )
    }

    // CURRENCIES
    fetchCurrencies(callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest(
            'currencies', 
            (data: any) => new Currencies(data), 
            callback, 
            this.trapEvent, 
            watch
        )
    }

    // DISHES
    fetchDishes(callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest(
            'dishes', 
            (data: any) => data.map((obj: any) => new Dish(obj)), 
            callback, 
            this.dishesChangedEvent,
            watch
        )
    }

    fetchDish(id: string, callback: Function = this.defaultCallback, watch: boolean = true): Observable<any> {
        return this.makeGetRequest(
            `dishes/${id}`,
            (data: any) => new Dish(data), 
            callback, 
            this.dishChangedEvent, 
            watch
        )
    }

    removeDish(id: string, callback: Function = this.defaultCallback): Observable<any> {
        return this.makeDeleteRequest(
            `dishes/${id}`
        )
    }

    addDish(dish: Dish, callback: Function = this.defaultCallback): Observable<any> {
        return this.makePostRequest(
            'dishes', 
            dish, 
            callback, 
            this.dishChangedEvent
        )
    }

    private makeGetRequest(url: string, constructor: any, callback: Function, emitter: EventEmitter<any> = this.trapEvent, watch: boolean = true): Observable<any> {
        if (watch) {
            return this.webRequestService
                .get(url)
                .pipe(tap((res: HttpResponse<any>) => {
                    // @ts-ignore
                    if (res.data) emitter.emit(callback(constructor(res.data)))
                })
            )
        } else {
            return this.webRequestService
                .get(url)
                .pipe(
                    first(),
                    tap((res: HttpResponse<any>) => {
                        // @ts-ignore
                        if (res.data) emitter.emit(callback(constructor(res.data)))                 
                    }
                )
            )
        }
    }

    private makeDeleteRequest(url: string, emitter: EventEmitter<any> = this.trapEvent): Observable<any> {
        return this.webRequestService
            .delete(url)
            .pipe(
                first()
            )
    }

    private makePostRequest(url: string, data: any, callback: Function, emitter: EventEmitter<any> = this.trapEvent): Observable<any> {
        return this.webRequestService
            .post(url, data)
            .pipe(
                first(),
                tap((res: HttpResponse<any>) => {
                    // @ts-ignore
                    if (res.data) emitter.emit(callback(res.data))            
                }
            )
        )
    }

    private makePatchRequest(url: string, constructor: any, data: any, callback: Function, emitter: EventEmitter<any> = this.trapEvent): Observable<any> {
        console.log('request', data)
        return this.webRequestService
            .patch(url, data)
            .pipe(
                first(),
                tap((res: HttpResponse<any>) => {
                    // @ts-ignore
                    if (res.data) emitter.emit(callback(constructor(res.data)))
                }
            )
        )
    }
}
