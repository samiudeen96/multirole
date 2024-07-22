import { Injectable } from '@angular/core';


const TOKEN = 'token';
const USER = 'user'


@Injectable({
  providedIn: 'root'
})


export class StorageService {
  constructor() { }


  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

}
