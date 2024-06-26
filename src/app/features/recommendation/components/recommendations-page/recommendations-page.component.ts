import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/state';
import { selectUsername } from '../../../auth/store/selectors/auth.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recommendations-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recommendations-page.component.html',
  styleUrl: './recommendations-page.component.sass',
})
export class RecommendationsPageComponent {
  username$: Observable<string | undefined> | null = null;

  constructor(store: Store<AuthState>) {
    this.username$ = store.select(selectUsername);
  }

  moveCarousel(carouselId: string, direction: number) {
    const carousel = document.getElementById(carouselId) as HTMLDivElement;
    const itemWidth = (carousel.querySelector('.carousel-item') as HTMLDivElement).offsetWidth;
    carousel.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
}
}
