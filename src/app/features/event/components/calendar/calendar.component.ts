import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, addHours, endOfDay, addMonths, subMonths, isSameDay, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventAdapter } from '../../../../shared/adapters/event-adapter';
import { Event } from '../../../../shared/models/Event';

export interface EventWithRepeatMode extends CalendarEvent {
  repeatMode: number;
}

interface DayWithEvents {
  date: Date;
  events: CalendarEvent[];
  inCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: EventWithRepeatMode[] = [];
  selectedDate: Date | null = null;
  selectedDateEvents: CalendarEvent[] = [];
  generatedEvents: CalendarEvent[] = [];
  daysInMonth: DayWithEvents[] = [];
  selectedEvent: CalendarEvent | null = null;

  constructor(private router: Router, private eventService: EventService, private eventAdapter: EventAdapter) {}

  ngOnInit(): void {
    this.eventService.getForUser().subscribe(events => {
      console.log('Events fetched from backend:', events);
      this.events = events.map(event => this.transformEvent(event));
      this.generateRecurringEvents();
      this.generateDaysInMonth();
    });
  }

  transformEvent(event: Event): EventWithRepeatMode {
    return {
      id: event.id,
      title: event.title,
      start: new Date(event.dateTimeStart),
      end: new Date(event.dateTimeEnd),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      meta: {
        notes: event.notes
      },
      repeatMode: event.repeatMode,
    };
  }

  generateRecurringEvents(): void {
    const start = startOfWeek(startOfMonth(this.viewDate));
    const end = endOfWeek(endOfMonth(this.viewDate));

    this.generatedEvents = [];
    console.log('Generating recurring events for the range:', start, 'to', end);

    this.events.forEach(event => {
        const eventStart = startOfDay(event.start);
        const eventEnd = endOfDay(event.end!);
        console.log('Processing event:', event);

        switch (event.repeatMode) {
            case 0: // ONCE
                if (eventStart >= start && eventStart <= end) {
                    this.generatedEvents.push(event);
                    console.log('Added one-time event:', event);
                }
                break;
            case 1: // DAILY
                for (let date = start; date <= end; date = addDays(date, 1)) {
                    const newEvent = { ...event, start: startOfDay(date), end: endOfDay(date) };
                    this.generatedEvents.push(newEvent);
                    console.log('Added daily event instance:', newEvent);
                }
                break;
            case 2: // WEEKLY
                for (let date = start; date <= end; date = addDays(date, 1)) {
                    if (eventStart.getDay() === date.getDay()) {
                        const newEvent = { ...event, start: startOfDay(date), end: endOfDay(date) };
                        this.generatedEvents.push(newEvent);
                        console.log('Added weekly event instance:', newEvent);
                    }
                }
                break;
            case 3: // MONTHLY
                for (let date = start; date <= end; date = addDays(date, 1)) {
                    if (eventStart.getDate() === date.getDate()) {
                        const newEvent = { ...event, start: startOfDay(date), end: endOfDay(date) };
                        this.generatedEvents.push(newEvent);
                        console.log('Added monthly event instance:', newEvent);
                    }
                }
                break;
        }
    });

    console.log('Generated Events:', this.generatedEvents);
}


  generateDaysInMonth(): void {
    const start = startOfWeek(startOfMonth(this.viewDate));
    const end = endOfWeek(endOfMonth(this.viewDate));
    this.daysInMonth = [];
    console.log('Generating days in month from:', start, 'to', end);

    for (let date = start; date <= end; date = addDays(date, 1)) {
        const eventsForDate = this.getEventsForDate(date);
        this.daysInMonth.push({
            date,
            events: eventsForDate,
            inCurrentMonth: date.getMonth() === this.viewDate.getMonth()
        });
    }

    console.log('Days in Month:', this.daysInMonth);
  }


  getEventsForDate(date: Date): CalendarEvent[] {
    const eventsForDate = this.generatedEvents.filter(event => isSameDay(event.start, date));
    return eventsForDate;
}


  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.generateRecurringEvents();
    this.generateDaysInMonth();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.generateRecurringEvents();
    this.generateDaysInMonth();
  }

  handleEventClick(event: CalendarEvent, eventClick: MouseEvent): void {
    eventClick.stopPropagation();
    this.selectedEvent = event;
  }

  editEvent(event: CalendarEvent): void {
    this.router.navigate(['/event/edit', event.id]);
  }

  deleteEvent(event: CalendarEvent): void {
    this.eventService.delete(event.id as string).subscribe(() => {
      this.events = this.events.filter(e => e !== event);
      this.generateRecurringEvents();
      this.generateDaysInMonth();
      this.selectedEvent = null;
    });
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  createEvent(): void {
    this.router.navigate(['/event/create']);
  }

  closePopup(): void {
    this.selectedDate = null;
    this.selectedEvent = null;
  }
}
