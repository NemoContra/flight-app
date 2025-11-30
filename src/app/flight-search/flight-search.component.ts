import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from './flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import {
  debounce,
  Field,
  form,
  minLength,
  required,
  validateTree,
} from '@angular/forms/signals';
import { httpResource } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, FlightCardComponent, Field],
})
export class FlightSearchComponent {
  configService = inject(ConfigService);
  flightsResource = httpResource<Flight[]>(() => {
    const { from, to } = this.flightSearchForm().value();

    const config = this.configService.config();
    if (!config) return;

    const url = `${config.baseUrl}/flight`;
    const params = { from, to };

    if (this.flightSearchForm().invalid()) return;

    return { url, params };
  });

  flights = linkedSignal(() => this.flightsResource.value());
  selectedFlight = signal<Flight | undefined>(undefined);
  message = signal('');

  flightSearchModel = signal({
    from: 'London',
    to: 'Paris',
  });

  flightSearchForm = form(this.flightSearchModel, (path) => {
    required(path.from, {
      message: 'From is required',
    });
    required(path.to, {
      message: 'To is required',
    });

    debounce(path.from, 500);
    debounce(path.to, 500);

    minLength(path.from, 3, {
      message: 'From must be at least 3 characters long',
    });
    minLength(path.to, 3, {
      message: 'To must be at least 3 characters long',
    });
    validateTree(path, (ctx) => {
      const { from, to } = ctx.value();
      if (from && to && from.toLowerCase() === to.toLowerCase()) {
        return [
          {
            kind: 'roundtrip',
            field: ctx.field.to,
            message: 'From and To cannot be the same',
            from,
            to,
          },
        ];
      }

      return null;
    });
  });

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  private flightService = inject(FlightService);

  search(): void {
    if (this.flightSearchForm().invalid()) return;

    this.message.set('');
    this.selectedFlight.set(undefined);

    const { from, to } = this.flightSearchForm().value();

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
