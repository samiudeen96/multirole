import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/auth/storage.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  userLogin: FormGroup;
  userRegister: FormGroup;

  token: any;
  userProfile: User | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService

  ) {

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
      role_id: [, [Validators.required]]
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
    this.auth.login(this.userLogin.value).subscribe((res) => {
      this.token = res.token;
      console.log(this.token);
      this.profile();
    });
    this.userLogin.reset();
  }

  profile() {
    this.auth.getProfile(this.token).subscribe((res) => {
      this.userProfile = res
      console.log("Profile: " + JSON.stringify(this.userProfile));

      if (this.userProfile != null) {
        const user: User = {
          id: this.userProfile.id,
          role_id: this.userProfile.role_id,
          name: this.userProfile.name,
        }
        this.storage.saveUser(user);
        this.storage.saveToken(this.token);

        if(this.storage.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
          this.toastr.success(`Hello! ${this.userProfile.name}`);
        }else if(this.storage.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");
          this.toastr.success(`Hello! ${this.userProfile.name}`);
        }else{
          console.log("Bad credential");
          
        }
      }

    });
  }

  submit() {
    this.auth.signup(this.userRegister.value).subscribe((res) => {
      console.log(res);
    })
    this.userRegister.reset();
    this.currentPage = 'login'
  }


}