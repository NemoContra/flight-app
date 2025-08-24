import { inject } from '@angular/core';
import { basketEvents, FlightStore, searchEvents } from './flight-store';
import { injectDispatch } from '@ngrx/signals/events';

export const injectFlightFacade = () => {
  const flightStore = inject(FlightStore);
  const searchEventsDispatcher = injectDispatch(searchEvents);
  const basketEventsDispatcher = injectDispatch(basketEvents);

  const { flights, loading, selectedFlight, basket } = flightStore;
  const { load, select, reset } = searchEventsDispatcher;
  const { updateBasket } = basketEventsDispatcher;

  return {
    flights,
    loading,
    selectedFlight,
    basket,
    load,
    select,
    reset,
    updateBasket,
  };
};
