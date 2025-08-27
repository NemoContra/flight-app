import {
  patchState,
  signalStore,
  withLinkedState,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { inject, isDevMode } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  withDevtools,
  withDevToolsStub,
} from '@angular-architects/ngrx-toolkit';

const initialState = {
  flights: [] as Flight[],
  selectedFlight: undefined as Flight | undefined,
  basket: {} as Record<string, boolean>,
  urgent: false,
  from: 'Hamburg',
  to: 'Graz',
  error: undefined as number | undefined,
};

export const FlightSearchStore = signalStore(
  isDevMode() ? withDevtools('flightSearch') : withDevToolsStub('flightSearch'),
  withState(initialState),
  withLinkedState(({ from, to, urgent }) => ({
    from,
    to,
    urgent,
  })),
  withMethods((store, flightService = inject(FlightService)) => ({
    search: rxMethod<void>((source$) =>
      source$.pipe(
        switchMap(() =>
          flightService.find(store.from(), store.to(), store.urgent()).pipe(
            tapResponse({
              next: (flights) => patchState(store, { flights }),
              error: ({ status }: HttpErrorResponse) =>
                patchState(store, { error: status }),
            })
          )
        )
      )
    ),
  }))
);
