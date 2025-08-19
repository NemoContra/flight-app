import { Component, inject, signal } from '@angular/core';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from './flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [FormsModule, FlightCardComponent, JsonPipe],
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Paris';
  flights: Array<Flight> = [];
  message = '';

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  flightSearchModel = signal({
    from: 'London',
    to: 'Paris',
  });

  flightSearchForm = form();

  private flightService = inject(FlightService);

  search(): void {
    // Reset properties
    this.message = '';

    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
    });
  }
}
