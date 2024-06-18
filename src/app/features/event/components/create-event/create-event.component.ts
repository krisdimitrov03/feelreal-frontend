// src/app/features/calendar/create-event/create-event.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, EventCreateModel } from '../../../../shared/models/Event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass'],
})
export class CreateEventComponent {
  eventForm: FormGroup;

  constructor(
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      notes: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      dateTimeStart: new FormControl('', Validators.required),
      dateTimeEnd: new FormControl('', Validators.required),
      repeatMode: new FormControl(0, Validators.required),
      userId: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    console.log('Form submitted:', this.eventForm.value);
    if (this.eventForm.valid) {
      const newEvent: EventCreateModel = this.eventForm.value;
      newEvent.repeatMode = Number(newEvent.repeatMode); // Ensure repeatMode is a number
      this.eventService.create(newEvent);
      console.log('Event created:', newEvent);
      this.router.navigate(['/calendar']);
    }
  }
}
