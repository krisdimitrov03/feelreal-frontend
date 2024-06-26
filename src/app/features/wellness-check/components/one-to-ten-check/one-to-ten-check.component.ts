import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/state';
import { selectId } from '../../../auth/store/selectors/auth.selectors';
import { WellnessCheckCreateModel } from '../../../../shared/models/WellnessCheck';
import { WellnessCheckService } from '../../services/wellness-check.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-one-to-ten-check',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './one-to-ten-check.component.html',
  styleUrls: ['./one-to-ten-check.component.sass'],
})
export class OneToTenCheckComponent implements OnInit, OnDestroy {
  service = inject(WellnessCheckService);
  subscription: Subscription | null = null;

  form = new FormGroup({
    value: new FormControl(5, Validators.required),
  });

  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  currentValue = 5;

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit() {
    this.form.get('value')?.valueChanges.subscribe(value => {
      this.currentValue = value as number;
    });
  }

  highlightNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentValue = parseInt(input.value, 10);
  }

  onSubmit() {
    this.subscription = this.store.select(selectId).subscribe((userId) => {
      const { value } = this.form.value;

      const model: WellnessCheckCreateModel = {
        value: value as number,
        date: new Date().toLocaleDateString('en-CA'),
        type: 0,
        userId: userId as string,
      };

      this.service.createCheck(model).subscribe((result) => {
        if (result) this.router.navigate(['/']);
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
