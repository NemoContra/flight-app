import { inject } from '@angular/core';
import { basketEvents, FlightStore, searchEvents } from './flight-store';
import { injectDispatch } from '@ngrx/signals/events';

export const injectFlightFacade = (
  { flights, loading, selectedFlight, basket } = inject(FlightStore),
  { load, select, reset } = injectDispatch(searchEvents),
  { updateBasket } = injectDispatch(basketEvents)
) => ({
  flights,
  loading,
  selectedFlight,
  basket,
  load,
  select,
  reset,
  updateBasket,
});
