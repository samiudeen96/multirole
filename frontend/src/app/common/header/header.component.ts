import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/auth/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public storage: StorageService, public router: Router) { }

  ngOnInit(): void { }

  logout() {
    this.storage.logout();
    this.router.navigateByUrl("/");
  }

}
