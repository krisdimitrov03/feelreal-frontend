import { Component, NgModule, OnDestroy, OnInit, inject } from '@angular/core';
import { WellnessCheckService } from '../../services/wellness-check.service';
import { AsyncPipe } from '@angular/common';
import { OneToTenCheckComponent } from '../one-to-ten-check/one-to-ten-check.component';
import { CompareToYesterdayCheckComponent } from '../compare-to-yesterday-check/compare-to-yesterday-check.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wellness-check-prompt',
  standalone: true,
  imports: [
    AsyncPipe,
    OneToTenCheckComponent,
    CompareToYesterdayCheckComponent,
  ],
  templateUrl: './wellness-check-prompt.component.html',
  styleUrl: './wellness-check-prompt.component.sass',
})
export class WellnessCheckPromptComponent implements OnDestroy, OnInit {
  service = inject(WellnessCheckService);
  lastCheck$ = this.service.getLastCheckForUser();

  subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.lastCheck$.subscribe((lastCheck) => {
      if (lastCheck !== 'no-check') {
        const lastCheckDate = new Date(lastCheck.date);
        lastCheckDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (lastCheckDate.getTime() === currentDate.getTime()) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
