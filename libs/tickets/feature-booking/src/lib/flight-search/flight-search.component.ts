import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { Flight } from '@flight-demo/tickets/domain';
import { injectFlightFacade } from './+store/flight-facade';
import { FlightStore } from './+store/flight-store';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, FlightCardComponent],
  providers: [FlightStore],
})
export class FlightSearchComponent {
  flightFacade = injectFlightFacade();

  ctx = signal({
    from: signal(''),
    to: signal(''),
  });

  search(): void {
    const from = this.ctx().from();
    const to = this.ctx().to();
    this.flightFacade.load({ from, to });
  }

  select(flight: Flight): void {
    this.flightFacade.select(flight);
  }

  reset() {
    this.ctx.set({
      from: signal(''),
      to: signal(''),
    });
  }

  updateBasket(id: number) {
    this.flightFacade.updateBasket(id);
  }
}
