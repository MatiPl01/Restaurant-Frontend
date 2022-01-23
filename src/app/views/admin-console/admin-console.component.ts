import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html'
})
export class AdminConsoleComponent  {
  constructor(public authService: AuthService) {}

  persistenceChange(): void {
    this.authService.setPersistence(this.authService.persistence)
  }
}
