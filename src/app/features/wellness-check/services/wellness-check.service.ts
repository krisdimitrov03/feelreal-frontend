import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  WellnessCheck,
  WellnessCheckCreateModel,
} from '../../../shared/models/WellnessCheck';
import api from '../../../core/constants/api-url.constants';

@Injectable({
  providedIn: 'root',
})
export class WellnessCheckService {
  httpClient = inject(HttpClient);

  getLastCheckForUser(): Observable<WellnessCheck | 'no-check'> {
    return this.getChecksForUser().pipe(
      map((checks) => {
        if (checks.length === 0) {
          return 'no-check';
        }

        checks = checks.sort((a, b) => {
          let dateA = new Date(a.date).getTime();
          let dateB = new Date(b.date).getTime();

          return dateB - dateA;
        });

        return checks[0];
      })
    );
  }

  createCheck(model: WellnessCheckCreateModel): Observable<boolean> {
    return this.httpClient.post<string>(api.wellnessCheck, model).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private getChecksForUser(): Observable<WellnessCheck[]> {
    return this.httpClient
      .get<WellnessCheck[]>(api.wellnessCheck)
      .pipe(catchError(() => []));
  }
}
