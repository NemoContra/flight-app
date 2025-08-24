import {
  signalStore,
  type,
  withComputed,
  withProps,
  withState,
} from '@ngrx/signals';
import { eventGroup, on, withReducer } from '@ngrx/signals/events';
import { Flight } from '@flight-demo/tickets/domain';
import { httpResource } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '@flight-demo/shared/util-config';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const searchEvents = eventGroup({
  source: 'search',
  events: {
    load: type<{ from: string; to: string }>(),
    success: type<Flight[]>(),
    reset: type<void>(),
    select: type<Flight | undefined>(),
  },
});

export const basketEvents = eventGroup({
  source: 'basket',
  events: {
    toggle: type<number>(),
  },
});

const initialState = {
  from: undefined as string | undefined,
  to: undefined as string | undefined,
  selectedFlight: undefined as Flight | undefined,
  basket: {} as Record<number, boolean>,
};

export const FlightStore = signalStore(
  withDevtools('FlightStore'),
  withState(initialState),
  withProps((store, { baseUrl } = inject(ConfigService).config) => ({
    _searchFlightsResource: httpResource<Flight[]>(() => {
      const from = store.from();
      const to = store.to();
      if (!from || !to) return;
      return {
        url: `${baseUrl}/flight`,
        params: { from, to },
      };
    }),
  })),
  withComputed(({ _searchFlightsResource }) => ({
    loading: _searchFlightsResource.isLoading,
    error: _searchFlightsResource.error,
    flights: _searchFlightsResource.value,
  })),
  withReducer(
    on(searchEvents.load, ({ payload: { from, to } }) => ({
      from,
      to,
    })),
    on(searchEvents.reset, () => initialState),
    on(searchEvents.select, ({ payload: selectedFlight }) => ({
      selectedFlight,
    })),
    on(basketEvents.toggle, ({ payload: id }, { basket }) => ({
      basket: {
        ...basket,
        [id]: !basket[id],
      },
    }))
  )
);
