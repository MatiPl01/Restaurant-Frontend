import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  openTab: string = 'login'

  constructor() { }

  ngOnInit(): void {
  }

  setOpenTab(tabName: string): void {
    this.openTab = tabName
  }
}
