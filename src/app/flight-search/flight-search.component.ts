import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectFlights } from '../inject-flights';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  imports: [FormsModule, DatePipe],
  styleUrl: './flight-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchComponent {
  from = signal<string>('London');
  to = signal<string>('Paris');
  flights = signal<Flight[]>([]);
  selectedFlight = signal<Flight | undefined>(undefined);

  flightService = injectFlights();

  foundMessage = computed(() => {
    console.log('computed', this.flights().length);
    return `Found ${this.flights().length} flights`;
  });

  message = signal<string>('');

  private destroyRef = inject(DestroyRef);

  search(): void {
    this.message.set('');
    this.selectedFlight.set(undefined);

    const params = { from: this.from(), to: this.to() };

    this.flightService
      .getFlights(params)
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
    const selectedFlight = this.selectedFlight();
    if (!selectedFlight) return;

    this.flightService
      .saveFlight(selectedFlight)
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
