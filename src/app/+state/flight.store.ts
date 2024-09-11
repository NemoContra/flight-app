import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Flight } from '../model/flight';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { withRequestStatus } from './request-status.feature';

const url = 'https://demo.angulararchitects.io/api/flight';
const headers = { Accept: 'application/json' };

export const FlightStore = signalStore(
  withRequestStatus(),
  withState({
    selectedFlight: undefined as Flight | undefined,
    flights: [] as Flight[],
    error: undefined as string | undefined,
    basket: {} as Record<number, boolean>,
  }),
  withComputed(({ flights }) => ({
    flightsLength: computed(() => flights().length),
  })),
  withMethods(({ basket, ...store }, httpClient = inject(HttpClient)) => ({
    setSelectedFlight(selectedFlight: Flight) {
      patchState(store, { selectedFlight });
    },
    updateBasket(id: number, selected: boolean) {
      patchState(store, { basket: { ...basket(), [id]: selected } });
    },
    searchFlights: rxMethod<{ from: string; to: string }>(
      switchMap((params) => {
        return httpClient.get<Flight[]>(url, { params, headers }).pipe(
          tapResponse({
            next: (flights) => patchState(store, { flights }),
            error: ({ statusText }: HttpErrorResponse) =>
              patchState(store, { error: statusText }),
          }),
        );
      }),
    ),
    saveFlights: rxMethod<void>(
      exhaustMap(() => {
        return httpClient
          .post<Flight>(url, store.selectedFlight(), { headers })
          .pipe(
            tapResponse({
              next: (flight) => patchState(store, { selectedFlight: flight }),
              error: ({ statusText }: HttpErrorResponse) =>
                patchState(store, { error: statusText }),
            }),
          );
      }),
    ),
  })),
);
