// src/app/features/calendar/event.service.ts
import { Injectable } from '@angular/core';
import { EventDTO } from '../../shared/models/EventDTO';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly storageKey = 'calendarEvents';

  constructor() {}

  getEvents(): EventDTO[] {
    const events = localStorage.getItem(this.storageKey);
    return events ? JSON.parse(events) : [];
  }

  saveEvent(event: EventDTO): void {
    const events = this.getEvents();
    event.repeatMode = Number(event.repeatMode); // Ensure repeatMode is stored as a number
    events.push(event);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
