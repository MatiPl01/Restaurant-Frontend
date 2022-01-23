import { Injectable } from "@angular/core";
import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

class RouteNode {
    // @ts-ignore
    next: RouteNode = null
    // @ts-ignore
    prev: RouteNode = null
    constructor(public value: any) {}
}

class RoutesHist {
    // @ts-ignore
    head: RouteNode = null
    // @ts-ignore
    tail: RouteNode = null
    length: number = 0

    constructor(private lengthLimit: number = 10) {}

    add(value: any): void {
        const node = new RouteNode(value)
        if (!this.head) {
            this.head = this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }

        if (this.length > this.lengthLimit) this.removeFirst()
    }

    removeFirst(): RouteNode {
        // @ts-ignore
        if (!this.head) return null
        const removed = this.head
        this.head = this.head.next
        // @ts-ignore
        if (this.head) this.head.prev = null
        // @ts-ignore
        else this.tail = null
        this.length--
        return removed
    }

    removeLast(): RouteNode {
        // @ts-ignore
        if (!this.tail) return null
        const removed = this.tail.value
        this.tail = this.tail.prev
        // @ts-ignore
        if (this.tail) this.tail.next = null
        // @ts-ignore
        else this.head = null
        this.length--
        return removed
    }

    getFirst(): RouteNode {
        return this.head
    }

    getLast(): RouteNode {
        return this.tail
    }
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    routesHist: RoutesHist = new RoutesHist()
    // @ts-ignore
    lastRoute: RouteNode = null
    navigationSuccess: boolean = false

    constructor(private router: Router) {
        this.router.errorHandler = () => {
            this.router.navigate(['/error'])
        }

        this.router.events.forEach((event: any) => {
            if (event instanceof NavigationEnd) {
                this.routesHist.add(this.router.url)
                console.log(this.getLastRoutes(10).map((node: RouteNode) => node.value))
            }
        })
    }

    getLastRoute(): RouteNode {
        return this.routesHist.getLast()
    }

    getLastRoutes(count: number): RouteNode[] {
        const res = []
        
        let i = 0
        let lastRoute = this.routesHist.getLast()
        while (lastRoute && i++ < count) {
            res.push(lastRoute)
            lastRoute = lastRoute.prev
        }

        return res
    }

    async back() {
        this.lastRoute = this.routesHist.getLast()?.prev

        while (this.lastRoute && !this.navigationSuccess) {
            // Skip the error page
            if (this.lastRoute.value.startsWith('/error')) {
                // Skip the error page and a route which caused an error
                this.lastRoute = this.lastRoute.prev?.prev
                continue
            }

            const url = this.lastRoute.value.split('?')[0]
            const queryParams = this.router.parseUrl(url).queryParams

            await this.router.navigate([url], { queryParams })
                // @ts-ignore
                .then(() => {
                    this.navigationSuccess = true
                })
                .catch(() => {
                    this.lastRoute = this.lastRoute.prev
                })
        }

        // If there was no previous valid route, navigate to the homepage
        if (!this.navigationSuccess) {
            this.router.navigate(['/'])
        }

        // @ts-ignore
        this.lastRoute = null
        this.navigationSuccess = false
    }
}
