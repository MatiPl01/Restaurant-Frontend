import { Component, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Location } from '@angular/common'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
  isEmailValid: boolean = false
  // @ts-ignore
  postError: Error = undefined
  @ViewChild('f') form!: NgForm

  constructor(private location: Location,
              private usersService: UsersService) {}

  onSubmit(form: NgForm): void {
    if (form.valid && this.isEmailValid && form.value.password === form.value.repeatedPassword) {

      const userData = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        repeatedPassword: form.value.repeatedPassword
      }

      this.usersService.registerUser(userData).subscribe({
        next: () => this.location.back(),
        error: err => {
          this.postError = err.error
          console.error(err.error.message)
        }
      })
    }
  }

  onEmailInput(): void {
    this.isEmailValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(this.form.value.email)
  }
}
