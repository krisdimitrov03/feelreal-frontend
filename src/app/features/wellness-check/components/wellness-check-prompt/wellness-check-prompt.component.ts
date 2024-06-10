import { Component, inject } from '@angular/core';
import { WellnessCheckService } from '../../services/wellness-check.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-wellness-check-prompt',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './wellness-check-prompt.component.html',
  styleUrl: './wellness-check-prompt.component.sass'
})
export class WellnessCheckPromptComponent {
  service = inject(WellnessCheckService);

  lastCheck$ = this.service.getLastCheckForUser().pipe(tap(console.log));
}
