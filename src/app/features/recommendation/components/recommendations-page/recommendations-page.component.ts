import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AuthState } from '../../../auth/store/state';
import { selectUsername } from '../../../auth/store/selectors/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { RecommendationService } from '../../services/recommendation.service';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { EventService } from '../../../event/services/event.service';
import { EventCreateModel } from '../../../../shared/models/Event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations-page',
  standalone: true,
  imports: [AsyncPipe, LoaderComponent],
  templateUrl: './recommendations-page.component.html',
  styleUrl: './recommendations-page.component.sass',
})
export class RecommendationsPageComponent {
  store = inject(Store<AuthState>);
  recommendationService = inject(RecommendationService);
  eventService = inject(EventService);

  username$ = this.store.select(selectUsername);
  tips$ = this.recommendationService.recommendTips();
  article$ = this.recommendationService.recommendArticle();
  event$ = this.recommendationService
    .recommendEvent()
    .pipe(tap((event) => (this.eventToAdd = event)));

  eventToAdd: EventCreateModel | null = null;

  router = inject(Router);

  moveCarousel(carouselId: string, direction: number) {
    const carousel = document.getElementById(carouselId) as HTMLDivElement;
    const itemWidth = (
      carousel.querySelector('.carousel-item') as HTMLDivElement
    ).offsetWidth;
    carousel.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
  }

  formatDateTime(dateTime: string) {
    return new Date(dateTime).toLocaleString();
  }

  nextArticle() {
    this.article$ = this.recommendationService.recommendArticle();
  }

  nextEvent() {
    this.event$ = this.recommendationService.recommendEvent();
  }

  addToCalendar(): void {
    const newStartDate = this.eventToAdd?.dateTimeStart.replace(' ', 'T');
    const newEndDate = this.eventToAdd?.dateTimeEnd.replace(' ', 'T');

    this.eventToAdd!.dateTimeStart = newStartDate as string;
    this.eventToAdd!.dateTimeEnd = newEndDate as string;

    this.eventService
      .create(this.eventToAdd as EventCreateModel)
      .subscribe((result) => {
        console.log(result);

        if (result) this.router.navigate(['/event/calendar']);
        else alert('Failed to add event to calendar.');
      });
  }
}