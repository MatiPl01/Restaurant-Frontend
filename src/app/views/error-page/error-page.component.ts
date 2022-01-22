import { Component, OnInit } from '@angular/core'
import { ErrorService } from 'src/app/services/error.service'

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {
  description!: string
  status!: string
  message!: string

  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {
    const errorDetails = this.errorService.getDetails()
    this.description = errorDetails.description
    this.status = errorDetails.status
    this.message = errorDetails.message
  }
}
