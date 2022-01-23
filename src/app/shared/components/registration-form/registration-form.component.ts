import { Component, Output, ViewChild, EventEmitter, Input } from '@angular/core'
import { NgForm } from '@angular/forms'
import { RegisterData } from '../../schemas/others/register-data.schema'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
  @Input() errorMsg!: string
  @Output() registrationEvent = new EventEmitter<RegisterData>()

  isEmailValid: boolean = false

  @ViewChild('f') form!: NgForm

  constructor() {}

  onSubmit(form: NgForm): void {
    if (form.valid && this.isEmailValid && form.value.password === form.value.repeatedPassword) {
      const userData: RegisterData = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        repeatedPassword: form.value.repeatedPassword
      }

      this.registrationEvent.emit(userData)
    }
  }

  onEmailInput(): void {
    this.isEmailValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(this.form.value.email)
  }
}
