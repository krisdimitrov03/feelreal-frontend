import { Injectable } from '@angular/core';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventAdapter {
  adapt(item: any): Event {
    return {
      id: item.id,
      title: item.title,
      notes: item.notes,
      dateTimeStart: item.dateTimeStart,
      dateTimeEnd: item.dateTimeEnd,
      repeatMode: this.mapRepeatMode(item.repeatMode),
    };
  }

  private mapRepeatMode(repeatMode: string): number {
    switch (repeatMode.toLowerCase()) {
      case 'once': return 0;
      case 'daily': return 1;
      case 'weekly': return 2;
      case 'monthly': return 3;
      default: return 0;
    }
  }

  private reverseMapRepeatMode(repeatMode: number): string {
    switch (repeatMode) {
      case 0: return 'once';
      case 1: return 'daily';
      case 2: return 'weekly';
      case 3: return 'monthly';
      default: return 'once';
    }
  }

  public adaptForBackend(event: Event): any {
    return {
      ...event,
      dateTimeStart: event.dateTimeStart,
      dateTimeEnd: event.dateTimeEnd,
      repeatMode: event.repeatMode
    };
  }
}
