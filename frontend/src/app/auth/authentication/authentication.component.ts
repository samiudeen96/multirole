import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userLogin: FormGroup;
  userRegister: FormGroup;

  token: any;
  userProfile: any;

  constructor(private fb: FormBuilder, private auth: AuthService) {

    // login
    this.userLogin = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required]]
    });

    // signup
    this.userRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmValidation.bind(this)]],
      role_id: [ , [Validators.required]]
    })

  }

  confirmValidation(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegister.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  ngOnInit(): void { }


  currentPage: 'login' | 'register' = 'login'

  show(page: 'login' | 'register') {
    this.currentPage = page;
  }


  login() {
    // console.log(this.userLogin.value);
    this.auth.login(this.userLogin.value).subscribe((res) => {
      this.token = res.token;
      console.log(res.token);
      this.profile();
    });
  }

  profile() {
    this.auth.getProfile(this.token).subscribe((res) => {
      this.userProfile = res
      console.log("Profile: " + JSON.stringify(this.userProfile));
    });
  }

  submit() {
    this.auth.signup(this.userRegister.value).subscribe((res) => {
      console.log(res);
    })
  }

}