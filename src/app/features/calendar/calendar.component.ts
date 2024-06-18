import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, addHours, endOfDay, addMonths, subMonths, isSameDay, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Router } from '@angular/router';
import { EventDTO } from '../../shared/models/EventDTO';
import { EventService } from '../../core/services/event.service';

export const mockEvents: EventDTO[] = [
  {
      id: 1,
      title: "Team Meeting",
      notes: "Discuss project updates and timelines",
      dateTimeStart: "2024-06-10T10:00:00",
      dateTimeEnd: "2024-06-10T11:00:00",
      repeatMode: 1,
      userId: '26d018f0-7602-41b6-ba19-105594e7693a'
  },
  {
      id: 1123,
      title: "Nqkuv monthly",
      notes: "Monthly discussions",
      dateTimeStart: "2024-06-10T10:00:00",
      dateTimeEnd: "2024-06-10T11:00:00",
      repeatMode: 3,
      userId: '26d018f0-7602-41b6-ba19-10559re7693a'
  },
  {
      id: 2,
      title: "Client Call",
      notes: "Monthly update call with the client",
      dateTimeStart: "2024-06-12T14:00:00",
      dateTimeEnd: "2024-06-12T15:00:00",
      repeatMode: 2,
      userId: 'gosho'
  },
  {
      id: 3,
      title: "Development Sprint",
      notes: "Start of the new sprint for development team",
      dateTimeStart: "2024-06-15T09:00:00",
      dateTimeEnd: "2024-06-15T12:00:00",
      repeatMode: 0,
      userId: '12'
  },
  {
      id: 4,
      title: "Product Launch",
      notes: "Launch of the new product version",
      dateTimeStart: "2024-07-01T13:00:00",
      dateTimeEnd: "2024-07-01T15:00:00",
      repeatMode: 0,
      userId: '26d018f0-7602-41b6-ba19-105594e7693a'
  },
  {
      id: 5,
      title: "Code Review",
      notes: "Review code for the latest merge requests",
      dateTimeStart: "2024-06-20T16:00:00",
      dateTimeEnd: "2024-06-20T18:00:00",
      repeatMode: 1,
      userId: 'gosho'
  }
];
interface EventWithRepeatMode extends CalendarEvent {
  repeatMode: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: EventWithRepeatMode[] = [];
  selectedDate: Date | null = null;
  selectedDateEvents: CalendarEvent[] = [];
  generatedEvents: CalendarEvent[] = [];

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents().map(event => {
      return {
        title: event.title,
        start: new Date(event.dateTimeStart),
        end: new Date(event.dateTimeEnd),
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF'
        },
        repeatMode: Number(event.repeatMode) // Ensure repeatMode is a number
      };
    });
    this.generateRecurringEvents();
  }

  generateRecurringEvents(): void {
    const start = startOfWeek(startOfMonth(this.viewDate));
    const end = endOfWeek(endOfMonth(this.viewDate));

    this.generatedEvents = [];

    this.events.forEach(event => {
      switch (event.repeatMode) {
        case 0: // ONCE
          if (event.start >= start && event.start <= end) {
            this.generatedEvents.push(event);
          }
          break;
        case 1: // DAILY
          for (let date = start; date <= end; date = addDays(date, 1)) {
            const newEvent = { ...event, start: date, end: addHours(date, event.end!.getHours() - event.start.getHours()) };
            this.generatedEvents.push(newEvent);
          }
          break;
        case 2: // WEEKLY
          for (let date = start; date <= end; date = addDays(date, 1)) {
            if (event.start.getDay() === date.getDay()) {
              const newEvent = { ...event, start: date, end: addHours(date, event.end!.getHours() - event.start.getHours()) };
              this.generatedEvents.push(newEvent);
            }
          }
          break;
        case 3: // MONTHLY
          for (let date = start; date <= end; date = addDays(date, 1)) {
            if (event.start.getDate() === date.getDate()) {
              const newEvent = { ...event, start: date, end: addHours(date, event.end!.getHours() - event.start.getHours()) };
              this.generatedEvents.push(newEvent);
            }
          }
          break;
      }
    });
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.generatedEvents.filter(event => isSameDay(event.start, date));
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.generateRecurringEvents();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.generateRecurringEvents();
  }

  handleDayClick(day: Date): void {
    this.selectedDate = day;
    this.selectedDateEvents = this.getEventsForDate(day);
  }

  createEvent(): void {
    this.router.navigate(['/createEvent']);
  }

  closePopup(): void {
    this.selectedDate = null;
  }
}
