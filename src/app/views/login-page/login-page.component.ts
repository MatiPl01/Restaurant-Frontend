import { Component } from '@angular/core'
import { LoginData } from 'src/app/shared/schemas/others/login-data.schema'
import { RegisterData } from 'src/app/shared/schemas/others/register-data.schema'
import { AuthService } from 'src/app/services/auth.service'
import { NavigationService } from 'src/app/services/navigation.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent  {
  openTab: string = 'login'
  isLoading: boolean = false
  loginErrorMsg: string = ''
  registrationErrorMsg: string = ''

  constructor(private authService: AuthService,
              private navigationService: NavigationService) {}

  setOpenTab(tabName: string): void {
    this.openTab = tabName
  }

  onLogin(userData: LoginData) {
    this.isLoading = true
    this.authService.loginUser(userData).subscribe({
      next: () => this.navigationService.back(),
      error: (errorMsg: any) => this.loginErrorMsg = errorMsg
    }).add(() => this.isLoading = false)
  }
  
  onRegistration(userData: RegisterData) {
    this.isLoading = true
    this.authService.registerUser(userData).subscribe({
      next: () => this.navigationService.back(),
      error: (errorMsg: string) => this.registrationErrorMsg = errorMsg
    }).add(() => this.isLoading = false)
  }
}
