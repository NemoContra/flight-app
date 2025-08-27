import { signalStore, type, withLinkedState, withState } from '@ngrx/signals';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { inject, isDevMode } from '@angular/core';
import {
  withDevtools,
  withDevToolsStub,
} from '@angular-architects/ngrx-toolkit';
import {
  eventGroup,
  Events,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const flightSearchEvents = eventGroup({
  source: 'flightSearch',
  events: {
    loadFlights: type<{ from: string; to: string; urgent: boolean }>(),
    loadFlightsSuccess: type<Flight[]>(),
    loadFlightsError: type<number>(),
  },
});

export const FlightSearchStore = signalStore(
  { providedIn: 'root' },
  isDevMode() ? withDevtools('flightSearch') : withDevToolsStub('flightSearch'),
  withState({
    flights: [] as Flight[],
    selectedFlight: undefined as Flight | undefined,
    basket: {} as Record<string, boolean>,
    urgent: false,
    from: 'Hamburg',
    to: 'Graz',
    error: undefined as number | undefined,
    flightsLoading: false,
  }),
  withLinkedState(({ from, to, urgent }) => ({
    from,
    to,
    urgent,
  })),
  withReducer(
    on(flightSearchEvents.loadFlights, () => ({
      flightsLoading: true,
    })),
    on(flightSearchEvents.loadFlightsSuccess, ({ payload: flights }) => ({
      flights,
    })),
    on(flightSearchEvents.loadFlightsError, ({ payload: error }) => ({ error }))
  ),
  withEffects(
    (_, events = inject(Events), flightService = inject(FlightService)) => ({
      loadFlights$: events.on(flightSearchEvents.loadFlights).pipe(
        switchMap(({ payload: { from, to, urgent } }) =>
          flightService.find(from, to, urgent).pipe(
            mapResponse({
              next: (flights) => flightSearchEvents.loadFlightsSuccess(flights),
              error: ({ status }: HttpErrorResponse) =>
                flightSearchEvents.loadFlightsError(status),
            })
          )
        )
      ),
    })
  )
);
