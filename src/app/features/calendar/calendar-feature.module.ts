// src/app/features/calendar/calendar-feature.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    CalendarComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarFeatureModule { }
