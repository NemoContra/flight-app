import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormsModule, ValidationErrors } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightStore } from '../+state/flight.store';
import { Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export const validateRoundTrip = (): ValidationErrors | null => {
  return null;
};

export const validateRoundTripAsync =
  (): Observable<ValidationErrors | null> => {
    return of(null);
  };

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  imports: [FormsModule, DatePipe, FlightCardComponent, JsonPipe],
  styleUrl: './flight-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlightStore],
})
export class FlightSearchComponent {
  from = signal('London');
  to = signal('Paris');
  flightStore = inject(FlightStore);

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group(
    {
      from: [''],
      to: [''],
    },
    {
      validators: [validateRoundTrip],
      asyncValidators: [validateRoundTripAsync],
    },
  );

  value = toSignal(this.form.valueChanges);
}
