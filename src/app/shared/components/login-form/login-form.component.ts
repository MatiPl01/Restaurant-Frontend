import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from '../../schemas/others/login-data.schema';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Input() errorMsg!: string
  @Output() loginEvent = new EventEmitter<LoginData>()

  constructor() {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const userData: LoginData = {
        email: form.value.email,
        password: form.value.password
      }

      this.loginEvent.emit(userData)
    }
  }
}
