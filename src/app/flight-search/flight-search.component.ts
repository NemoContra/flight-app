import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from './flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [FormsModule, FlightCardComponent, JsonPipe],
})
export class FlightSearchComponent {
  from = signal('London');
  to = signal('Paris');

  flights = signal<Flight[]>([]);
  selectedFlight = signal<Flight | undefined>(undefined);
  message = signal('');

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  private flightService = inject(FlightService);

  search(): void {
    this.message.set('');
    this.selectedFlight.set(undefined);

    const from = this.from();
    const to = this.to();

    this.flightService.find(from, to).subscribe({
      next: (flights) => {
        this.flights.set(flights);
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
    });
  }

  select(f: Flight): void {
    this.selectedFlight.set({ ...f });
  }
}
