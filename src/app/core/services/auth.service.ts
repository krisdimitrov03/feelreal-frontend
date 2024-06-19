import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO } from '../../shared/models/LoginDTO';
import { LoginReturnDTO } from '../../shared/models/LoginReturnDTO';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { RegisterDTO } from '../../shared/models/RegisterDTO';
import { User } from '../../shared/models/User';
import { jwtDecode } from 'jwt-decode';
import { Job } from '../../shared/models/Job';
import api from '../constants/api-url.constants';

const mockJobs = [
  {
    id: '41b52749-1f80-4781-b4d6-e5dc41770d35',
    name: 'Product Manager',
  },
  {
    id: '446a30c0-5e07-4587-8e5b-c4fe6d05f9e4',
    name: 'Data Analyst',
  },
  {
    id: 'a734d005-29aa-41a7-a231-6fcd630deb1e',
    name: 'Software Engineer',
  },
];


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'Auth-Token';
  private httpClient = inject(HttpClient);

  constructor() {}

  login(data: LoginDTO): Observable<User> {
    return this.httpClient.post<LoginReturnDTO>(api.user.login, data).pipe(
      filter((data) => data.successful === true),
      tap((data) => this.setSession(data.token)),
      map((data) => {
        const user = jwtDecode<User>(data.token);
        return user;
      })
    );
  }

  register(data: RegisterDTO): Observable<boolean> {
    return this.httpClient
      .post<{ successful: boolean; errors: string[] }>(api.user.register, data)
      .pipe(
        map((data) => data.successful),
        catchError((res: HttpErrorResponse) => {
          if (res.status === HttpStatusCode.BadRequest) {
            console.log(res.error);
          }
          return of(false);
        })
      );
  }

  authenticate(): Observable<boolean> {
    return this.httpClient.get<any>(api.user.authenticate).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    this.deleteSession();

    return of(true);
  }

  getUserFromSession(): User | null {
    const token = this.getToken();

    if (token === null) {
      return null;
    }

    return jwtDecode<User>(token);
  }

  

  getJobs(): Observable<any[]> {
    return of(mockJobs);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setSession(value: string): void {
    sessionStorage.setItem(this.tokenKey, value);
  }

  private deleteSession(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
