import { inject } from '@angular/core';
import { flightSearchEvents, FlightSearchStore } from './flight-search';
import { injectDispatch } from '@ngrx/signals/events';

export const injectFlightSearchFacade = (
  { flights, basket, from, to, urgent } = inject(FlightSearchStore),
  { loadFlights } = injectDispatch(flightSearchEvents)
) => ({
  flights,
  basket,
  from,
  to,
  urgent,
  search: (props: { from: string; to: string; urgent: boolean }) =>
    loadFlights(props),
});
