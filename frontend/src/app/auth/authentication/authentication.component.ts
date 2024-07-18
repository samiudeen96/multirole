import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userLogin: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.userLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

  }

  ngOnInit(): void {}


  currentPage: 'login' | 'register' = 'login'

  show(page: 'login' | 'register') {
    this.currentPage = page;
  }

  login() {
    console.log(this.userLogin.value);
    this.auth.login(this.userLogin.value).subscribe((res) => {
      console.log(res);
      
    })
  }

}
