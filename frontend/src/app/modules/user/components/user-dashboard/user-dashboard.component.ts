import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/auth/storage.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(public storage: StorageService, public router: Router) { }

  ngOnInit(): void {
  }

  
  logout() {
    this.storage.logout();
    this.router.navigateByUrl("/");
  }

}
