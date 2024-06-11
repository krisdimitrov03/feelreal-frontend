import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/state';
import { selectId } from '../../../auth/store/selectors/auth.selectors';
import { WellnessCheckCreateModel } from '../../../../shared/models/WellnessCheck';
import { WellnessCheckService } from '../../services/wellness-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-to-ten-check',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './one-to-ten-check.component.html',
  styleUrl: './one-to-ten-check.component.sass',
})
export class OneToTenCheckComponent {
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
        type: 0,
        userId: userId as string,
      };

      this.service.createCheck(model).subscribe((result) => {
        if (result) this.router.navigate(['/']);
      });
    });
  }
}
