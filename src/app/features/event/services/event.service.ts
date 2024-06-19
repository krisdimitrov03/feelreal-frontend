import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import api from '../../../core/constants/api-url.constants';
import {
  Event,
  EventCreateModel,
  EventUpdateModel,
} from '../../../shared/models/Event';
import { EventAdapter } from '../../../shared/adapters/event-adapter';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  httpClient = inject(HttpClient);
  eventAdapter = inject(EventAdapter);

  constructor() {}

  getForUser(): Observable<Event[]> {
    return this.httpClient.get<any[]>(api.event).pipe(
      map(events => events.map(event => this.eventAdapter.adapt(event))),
      catchError(() => of([]))
    );
  }

  getById(id: string): Observable<Event | null> {
    return this.httpClient.get<any>(`${api.event}/${id}`).pipe(
      map(event => this.eventAdapter.adapt(event)),
      catchError(() => of(null))
    );
  }

  create(data: EventCreateModel): Observable<boolean> {
    const requestData = this.eventAdapter.adaptForBackend(data as Event);
    console.log('Request data:', requestData);
    return this.httpClient.post<string>(api.event, requestData).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  update(id: string, data: EventUpdateModel): Observable<boolean> {
    const requestData = this.eventAdapter.adaptForBackend(data as Event);
    return this.httpClient.put<string>(`${api.event}/${id}`, requestData).pipe(
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
