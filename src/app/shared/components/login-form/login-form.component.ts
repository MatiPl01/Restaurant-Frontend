import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  areLoginDetailsCorrect: boolean = true
  wereLoginDetailsChecked: boolean = false
  // @ts-ignore
  postError: Error = undefined

  constructor(private location: Location,
              private usersService: UsersService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {

      const userData = {
        email: form.value.email,
        password: form.value.password
      }

      this.usersService.loginUser(userData).subscribe({
        next: () => this.location.back(),
        error: err => {
          this.postError = err.error
          console.error(err.error.message)
        }
      })
    }
  }
}
