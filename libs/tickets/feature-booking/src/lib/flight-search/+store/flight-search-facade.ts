import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { flightSearchActions, flightSearchFeature } from './flight-search';

type LoadFlightsProps = {
  from: string;
  to: string;
  urgent: boolean;
};

export const injectFlightSearchFacade = (store = inject(Store)) => ({
  flights: store.selectSignal(flightSearchFeature.selectFlights),
  loadFlights: ({ from, to, urgent }: LoadFlightsProps) =>
    store.dispatch(
      flightSearchActions.loadFlights({
        from,
        to,
        urgent,
      })
    ),
});
