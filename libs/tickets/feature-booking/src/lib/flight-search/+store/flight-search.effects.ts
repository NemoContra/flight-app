import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { flightSearchActions } from './flight-search';
import { switchMap } from 'rxjs';
import { FlightService } from '@flight-demo/tickets/domain';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const flightSearchEffects = {
  loadFlights: createEffect(
    (actions$ = inject(Actions), flightService = inject(FlightService)) =>
      actions$.pipe(
        ofType(flightSearchActions.loadFlights),
        switchMap(({ from, to, urgent }) =>
          flightService.find(from, to, urgent).pipe(
            mapResponse({
              next: (flights) =>
                flightSearchActions.loadFlightsSuccess({ flights }),
              error: (error: HttpErrorResponse) =>
                flightSearchActions.loadFlightsError({
                  errorCode: error.status,
                }),
            })
          )
        )
      ),
    { functional: true }
  ),
};
