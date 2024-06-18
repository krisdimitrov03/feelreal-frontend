import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import api from '../../../core/constants/api-url.constants';
import {
  Event,
  EventCreateModel,
  EventUpdateModel,
} from '../../../shared/models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  httpClient = inject(HttpClient);

  constructor() {}

  getForUser(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(api.event);
  }

  getById(id: string): Observable<Event> {
    return this.httpClient.get<Event>(`${api.event}/${id}`);
  }

  create(data: EventCreateModel): Observable<boolean> {
    return this.httpClient.post<string>(api.event, data).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  update(id: string, data: EventUpdateModel): Observable<boolean> {
    return this.httpClient.put<string>(`${api.event}/${id}`, data).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<string>(`${api.event}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
