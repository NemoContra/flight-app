import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
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
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Paris';
  flights: Flight[] = [];
  selectedFlight: Flight | undefined;

  message = '';

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  search(): void {
    this.message = '';
    this.selectedFlight = undefined;

    const params = { from: this.from, to: this.to };

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
          this.flights = flights;
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
          this.selectedFlight = flight;
          this.message = 'Update successful!';
        },
        error: (errResponse: HttpErrorResponse) => {
          this.message = 'Error on updating the Flight';
          console.error(this.message, errResponse);
        },
      });
  }

  select(flight: Flight): void {
    this.selectedFlight = { ...flight };
  }
}
