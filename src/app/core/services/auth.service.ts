import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO } from '../../shared/models/LoginDTO';
import { LoginReturnDTO } from '../../shared/models/LoginReturnDTO';
import { Observable, filter, tap } from 'rxjs';
import { RegisterDTO } from '../../shared/models/RegisterDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080';
  private tokenKey = 'Auth-Token';
  private httpClient = inject(HttpClient);

  constructor() {}

  login(data: LoginDTO): Observable<LoginReturnDTO> {
    return this.httpClient.post<LoginReturnDTO>(`${this.url}/login`, data).pipe(
      filter((data) => data.status === true),
      tap((data) => this.setSession(this.tokenKey, data.token))
    );
  }

  register(data: RegisterDTO): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.url}/register`, data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setSession(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
