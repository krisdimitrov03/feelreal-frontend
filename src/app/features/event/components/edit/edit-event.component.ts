import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, EventCreateModel } from '../../../../shared/models/Event';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass'],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterModule],
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      notes: ['', [Validators.required, Validators.maxLength(500)]],
      dateTimeStart: ['', Validators.required],
      dateTimeEnd: ['', Validators.required],
      repeatMode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') as string;
    this.loadEvent();
  }

  loadEvent(): void {
    this.eventService.getById(this.eventId).subscribe(
      (event: Event | null) => {
        if (event) {
          this.eventForm.patchValue({
            title: event.title,
            notes: event.notes,
            dateTimeStart: event.dateTimeStart,
            dateTimeEnd: event.dateTimeEnd,
            repeatMode: event.repeatMode,
          });
        } else {
          console.error('Event not found');
        }
      },
      error => console.error('Error loading event', error)
    );
  }

  onSubmit(): void {
    console.log('Form submitted:', this.eventForm.value);
    if (this.eventForm.valid) {
      const updatedEvent: EventCreateModel = this.eventForm.value;
      updatedEvent.repeatMode = Number(updatedEvent.repeatMode);
      this.eventService.update(this.eventId, updatedEvent).subscribe(
        (event) => {
          console.log('Event updated:', event);
          this.router.navigate(['/event/calendar']);
        },
        error => console.error('Error updating event', error)
      );
    }
  }
}
