import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO } from '../../shared/models/LoginDTO';
import { LoginReturnDTO } from '../../shared/models/LoginReturnDTO';
import { Observable, filter, map, of, tap } from 'rxjs';
import { RegisterDTO } from '../../shared/models/RegisterDTO';
import { User } from '../../shared/models/User';
import { jwtDecode } from 'jwt-decode';

const mockUsers: (User & { token: string })[] = [
  {
    id: '26d018f0-7602-41b6-ba19-105594e7693a',
    username: 'user123',
    email: 'user123@outlook.com',
    role: 'admin',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2ZDAxOGYwLTc2MDItNDFiNi1iYTE5LTEwNTU5NGU3NjkzYSIsInVzZXJuYW1lIjoidXNlcjEyMyIsImlhdCI6MTUxNjIzOTAyMn0.yLJztAbctqIJCtEE7dUuGV1FerGrR46hvTB3zVvhGGk',
  },
  {
    id: '6dd8857a-02ff-4783-9c4b-09198c0d6e2c',
    username: 'user456',
    email: 'user456@outlook.com',
    role: 'user',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkZDg4NTdhLTAyZmYtNDc4My05YzRiLTA5MTk4YzBkNmUyYyIsInVzZXJuYW1lIjoidXNlcjQ1NiIsImlhdCI6MTUxNjIzOTAyMn0.ZZn8TU8Uw7st6ijlzWjNhQNQJykBbdO0iEtVonQejig',
  },
  {
    id: '2241430d-1e1c-4083-ba5c-01ad736d8612',
    username: 'user789',
    email: 'user789@outlook.com',
    role: 'user',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNDE0MzBkLTFlMWMtNDA4My1iYTVjLTAxYWQ3MzZkODYxMiIsInVzZXJuYW1lIjoidXNlcjc4OSIsImlhdCI6MTUxNjIzOTAyMn0.QNdh5_bI1v49dgZipQ50qIGtIWtCZLUdrKFFqE0pCYw',
  },
];

const mockJobs = [
  {
    id: '1',
    name: 'Software Developer',
  },
  {
    id: '2',
    name: 'Software Tester',
  },
  {
    id: '3',
    name: 'Software Engineer',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080';
  private tokenKey = 'Auth-Token';
  private httpClient = inject(HttpClient);

  constructor() {}

  login(data: LoginDTO): Observable<User> {
    // return this.httpClient.post<LoginReturnDTO>(`${this.url}/login`, data).pipe(
    //   filter((data) => data.status === true),
    //   tap((data) => this.setSession(this.tokenKey, data.token))
    // );

    const token = mockUsers.find((u) => u.username == data.username)?.token;

    return of({
      status: true,
      token,
    } as LoginReturnDTO).pipe(
      filter((data) => data.status === true),
      tap((data) => this.setSession(this.tokenKey, data.token)),
      map((data) => {
        const user = jwtDecode<User>(data.token);
        return user;
      })
    );
  }

  register(data: RegisterDTO): Observable<boolean> {
    // return this.httpClient.post<boolean>(`${this.url}/register`, data);

    return of(true);
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(this.tokenKey);

    return of(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getJobs(): Observable<any[]> {
    return of(mockJobs);
  }

  private setSession(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
