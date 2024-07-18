import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userLogin: FormGroup;

  constructor(private fb: FormBuilder,) {

    this.userLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
  }

  // loginContent = true
  // registerContent = false
  // login() {
  //   this.loginContent = true
  //   this.registerContent = false
  // }

  // register() {
  //   this.registerContent = true
  //   this.loginContent = false
  // }

  currentPage: 'login' | 'register' = 'login'

  show(page: 'login' | 'register') {
    this.currentPage = page;
  }

}
