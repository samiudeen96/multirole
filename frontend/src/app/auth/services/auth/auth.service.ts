
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.api}/auth/login`, loginRequest);
  }

  getProfile(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.api}/users/profile`, { headers });
  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(`${this.api}/auth/register`, signupRequest);
  }





}
