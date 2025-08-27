import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { Flight } from '@flight-demo/tickets/domain';
import { injectFlightSearchFacade } from './+store/flight-search-facade';

// import { TicketDataService } from '@flight-demo/checkin/domain';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, FlightCardComponent],
})
export class FlightSearchComponent {
  flightSearchFacade = injectFlightSearchFacade();

  from = signal('Hamburg');
  to = signal('Paris');
  urgent = signal(false);

  selectedFlight: Flight | undefined;

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  select(f: Flight): void {
    this.selectedFlight = { ...f };
  }
}
