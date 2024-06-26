import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/state';
import { selectUsername } from '../../../auth/store/selectors/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { RecommendationService } from '../../services/recommendation.service';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';

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

  username$ = this.store.select(selectUsername);
  tips$ = this.recommendationService.recommendTips();
  article$ = this.recommendationService.recommendArticle();
  event$ = this.recommendationService.recommendEvent();

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

  }
}
