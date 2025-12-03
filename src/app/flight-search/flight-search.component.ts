import { Component, computed, signal } from '@angular/core';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { JsonPipe } from '@angular/common';
import {
  debounce,
  Field,
  form,
  required,
  validateTree,
} from '@angular/forms/signals';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [FormsModule, FlightCardComponent, JsonPipe, Field],
})
export class FlightSearchComponent {
  flightsResource = httpResource<Flight[]>(() => {
    const url = `https://demo.angulararchitects.io/api/flight`;

    const headers = {
      Accept: 'application/json',
    };

    if (this.flightSearchForm().invalid()) {
      return;
    }

    const { from, to } = this.flightSearchForm().value();

    const params = { from, to };

    return { url, headers, params };
  });

  flights = computed(() => this.flightsResource.value() ?? []);
  flightsLoading = this.flightsResource.isLoading;

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  flightSearchModel = signal({
    from: 'London',
    to: 'Paris',
  });

  flightSearchForm = form(this.flightSearchModel, (path) => {
    required(path.from);
    required(path.to);
    debounce(path.from, 300);
    debounce(path.to, 300);

    validateTree(path, (ctx) => {
      const { from, to } = ctx.value();

      if (from === to) {
        return {
          kind: 'roundTrip',
          message: 'From and To must be different',
          field: ctx.field.to,
        };
      }

      return null;
    });
  });
}
