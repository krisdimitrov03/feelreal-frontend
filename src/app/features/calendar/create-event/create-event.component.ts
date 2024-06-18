// src/app/features/calendar/create-event/create-event.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDTO } from '../../../shared/models/EventDTO';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
})
export class CreateEventComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      notes: ['', [Validators.required, Validators.maxLength(500)]],
      dateTimeStart: ['', Validators.required],
      dateTimeEnd: ['', Validators.required],
      repeatMode: [0, Validators.required],
      userId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Form submitted:', this.eventForm.value);
    if (this.eventForm.valid) {
      const newEvent: EventDTO = this.eventForm.value;
      newEvent.repeatMode = Number(newEvent.repeatMode); // Ensure repeatMode is a number
      this.eventService.saveEvent(newEvent);
      console.log('Event created:', newEvent);
      this.router.navigate(['/calendar']);
    }
  }
}
