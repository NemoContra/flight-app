import { inject } from '@angular/core';
import { basketEvents, FlightStore, searchEvents } from './flight-store';
import { injectDispatch } from '@ngrx/signals/events';
import { Flight } from '@flight-demo/tickets/domain';

export const injectFlightFacade = () => {
  const flightStore = inject(FlightStore);
  const searchEventsDispatcher = injectDispatch(searchEvents);
  const basketEventsDispatcher = injectDispatch(basketEvents);

  return {
    flights: flightStore.flights,
    loading: flightStore.loading,
    error: flightStore.error,
    selectedFlight: flightStore.selectedFlight,
    basket: flightStore.basket,
    load: (params: { from: string; to: string }) =>
      searchEventsDispatcher.load(params),
    select: (flight: Flight | undefined) =>
      searchEventsDispatcher.select(flight),
    reset: () => searchEventsDispatcher.reset(),
    updateBasket: (id: number) => basketEventsDispatcher.toggle(id),
  };
};
