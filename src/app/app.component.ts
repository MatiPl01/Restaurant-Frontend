import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Event } from '@angular/router';
import { NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'YummyFood'

  // navigationFinished: boolean = true

  // constructor(private router: Router,
  //             private paginationService: PaginationService) {

  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationStart) {
  //       // Show loading indicator
  //       if (this.navigationFinished) {
  //         this.navigationFinished = false
  //         console.log('start', event.url, this.parseUrl(event.url))
  //         this.updateQueryParams(event.url)
  //       }
  //     }

  //     if (event instanceof NavigationEnd) {
  //       // Hide loading indicator
  //       console.log('end', event.url)
  //       this.navigationFinished = true
  //     }

  //     if (event instanceof NavigationError) {
  //       // Hide loading indicator

  //       // Present error to user
  //       console.log(event.error);
  //     }
  //   })
  // }

  // private updateQueryParams(url: string) {
  //   const parsed: any = this.parseUrl(url)
  //   this.router.navigate([parsed.url], {
  //     queryParams: parsed.params
  //   })
  // }

  // private parseUrl(url: string): Object {
  //   const res = {
  //     url: '',
  //     params: {}
  //   }
  //   const [link, params] = url.split('?')
  //   res.url = link
  //   if (params) params.split('&').forEach(param => {
  //     const [key, value] = param.split('=')
  //     // @ts-ignore
  //     res.params[key] = +value || value
  //   })
  //   return res
  // }
}
