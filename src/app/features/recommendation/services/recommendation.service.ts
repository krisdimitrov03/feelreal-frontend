import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import api from '../../../core/constants/api-url.constants';
import { Event } from '../../../shared/models/Event';
import { Article } from '../../../shared/models/Article';
import { Tip } from '../../../shared/models/Tip';

const mockTips: Tip[] = [
  { id: '1', content: 'Stay hydrated to keep your mind and body functioning well.', type: 1 },
  { id: '2', content: 'Volunteer or help others to enhance your happiness.', type: 1 },
  { id: '3', content: 'Focus on positive affirmations to shift your mindset.', type: 1 },
  { id: '4', content: 'Focus on small, manageable tasks to regain a sense of control.', type: 1 },
  { id: '5', content: 'Distract yourself with a good book or a hobby you enjoy.', type: 1 },
];

const mockArticle: Article = {
  id: '1',
  title: 'How to go through a routine revitalization?',
  content:
    'Routine can bring stability but also lead to monotony and a decline in happiness. Revitalizing your routine with new activities and changes can restore your excitement and joy in daily life. Introducing New Activities: Add new activities to your routine to break the monotony. Try learning a new language, taking up a sport, or exploring a new hobby. New experiences can stimulate your mind and bring fresh joy. Changing Your Environment: Small changes in your environment can have a big impact. Rearrange your furniture, redecorate a room, or work in different locations. A change of scenery can rejuvenate your outlook. Planning Surprises: Plan small surprises for yourself or others. It could be a spontaneous day trip, trying a new restaurant, or a surprise gift for a friend. Surprises add an element of excitement and anticipation to life. Setting Personal Challenges: Challenge yourself with personal goals, such as running a marathon, writing a book, or cooking a new recipe each week. Achieving these challenges can boost your confidence and happiness. Practicing Mindfulness: Incorporate mindfulness into your daily routine to appreciate the present moment. Mindfulness can help you find joy in everyday activities and reduce feelings of monotony.',
  type: 1,
};

const mockEvent: Event = {
  id: 1,
  title: 'Event 1',
  notes: 'Event 1 notes',
  dateTimeStart: '2021-09-01T10:00:00',
  dateTimeEnd: '2021-09-01T12:00:00',
  repeatMode: 1,
};

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  httpClient = inject(HttpClient);

  constructor() {}

  recommendTips(): Observable<Tip[]> {
    // return this.httpClient
    //   .get<Tip[]>(api.recommendation.tips)
    //   .pipe(catchError((e) => of([])));

    return of(mockTips);
  }

  recommendArticle(): Observable<Article> {
    // return this.httpClient
    //   .get<Article>(api.recommendation.article)
    //   .pipe(catchError((e) => of({} as Article)));

    return of(mockArticle);
  }

  recommendEvent(): Observable<Event> {
    // return this.httpClient
    //   .get<Event>(api.recommendation.event)
    //   .pipe(catchError((e) => of({} as Event)));

    return of(mockEvent);
  }
}
