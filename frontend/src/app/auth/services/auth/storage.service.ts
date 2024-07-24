import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

const TOKEN = 'token';
const USER = 'user';

// interface User {
//   id: number;
//   role_id: number;
// }

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  saveToken(token: string): void {
    window.localStorage.setItem(TOKEN, token);
  }

  saveUser(user: User): void {
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  getUser(): User | null {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  getUserRoleId(): number | null {
    const user = this.getUser();
    return user ? user.role_id : null;
  }

  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const roleId = this.getUserRoleId();
    return !!token && roleId === 1;
  }

  isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    const roleId = this.getUserRoleId();
    return !!token && roleId === 2;
  }

  logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}