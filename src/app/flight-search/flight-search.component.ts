import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { WrappedButtonComponent } from './wrapped-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  imports: [FormsModule, DatePipe, WrappedButtonComponent],
  styleUrl: './flight-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchComponent {
  from = signal<string>('London');
  to = signal<string>('Paris');
  flights = signal<Flight[]>([]);
  selectedFlight = signal<Flight | undefined>(undefined);

  message = signal<string>('');

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  search(): void {
    this.message.set('');
    this.selectedFlight.set(undefined);

    const params = { from: this.from(), to: this.to() };

    const headers = {
      Accept: 'application/json',
    };

    this.httpClient
      .get<Flight[]>('https://demo.angulararchitects.io/api/flight', {
        params,
        headers,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (flights) => {
          this.flights.set(flights);
        },
        error: (errResp) => {
          console.error('Error loading flights', errResp);
        },
      });
  }

  save(): void {
    if (!this.selectedFlight) return;

    const url = 'https://demo.angulararchitects.io/api/flight';

    const headers = {
      Accept: 'application/json',
    };

    this.httpClient
      .post<Flight>(url, this.selectedFlight, { headers })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (flight: Flight) => {
          this.selectedFlight.set(flight);
          this.message.set('Update successful!');
        },
        error: (errResponse: HttpErrorResponse) => {
          this.message.set('Error on updating the Flight');
          console.error(this.message, errResponse);
        },
      });
  }

  select(flight: Flight): void {
    this.selectedFlight.set(flight);
  }
}
