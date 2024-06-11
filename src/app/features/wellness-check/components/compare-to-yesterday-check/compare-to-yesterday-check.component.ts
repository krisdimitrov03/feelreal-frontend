import { Component, inject } from '@angular/core';
import { WellnessCheckCreateModel } from '../../../../shared/models/WellnessCheck';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { WellnessCheckService } from '../../services/wellness-check.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthState } from '../../../auth/store/state';
import { selectId } from '../../../auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-compare-to-yesterday-check',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './compare-to-yesterday-check.component.html',
  styleUrl: './compare-to-yesterday-check.component.sass',
})
export class CompareToYesterdayCheckComponent {
  service = inject(WellnessCheckService);

  form = new FormGroup({
    value: new FormControl(5, Validators.required),
  });

  constructor(private store: Store<AuthState>, private router: Router) {}

  onSubmit() {
    this.store.select(selectId).subscribe((userId) => {
      const { value } = this.form.value;

      const model: WellnessCheckCreateModel = {
        value: value as number,
        date: new Date().toLocaleDateString('en-CA'),
        type: 1,
        userId: userId as string,
      };

      this.service.createCheck(model).subscribe((result) => {
        if (result) this.router.navigate(['/']);
      });
    });
  }
}
