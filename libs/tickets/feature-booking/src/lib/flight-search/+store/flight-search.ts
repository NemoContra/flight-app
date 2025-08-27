import {
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';
import { Flight } from '@flight-demo/tickets/domain';

export const flightSearchActions = createActionGroup({
  source: 'flights',
  events: {
    loadFlights: props<{ from: string; to: string; urgent: boolean }>(),
    loadFlightsSuccess: props<{ flights: Flight[] }>(),
    loadFlightsError: props<{ errorCode: number }>(),
  },
});

const initialState = {
  flights: undefined as Flight[] | undefined,
  flightsLoading: false,
  flightsErrorCode: undefined as number | undefined,
};

export const flightSearchFeature = createFeature({
  name: 'flightSearch',
  reducer: createReducer(
    initialState,
    on(flightSearchActions.loadFlights, (state) => ({
      ...state,
      flightsLoading: true,
    })),
    on(flightSearchActions.loadFlightsSuccess, (state, { flights }) => ({
      ...state,
      flightsLoading: false,
      flights,
    })),
    on(flightSearchActions.loadFlightsError, (state, { errorCode }) => ({
      ...state,
      flightsLoading: false,
      error: errorCode,
    }))
  ),
});
