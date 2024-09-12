import { Flight } from '../model/flight';

export const mockFlights = {
  defaultFlight: {
    id: 1,
    from: 'London',
    to: 'Paris',
    date: '2021-12-24T12:00:00Z',
    delayed: false,
  },
  deylayedFlight: {
    id: 2,
    from: 'Paris',
    to: 'London',
    date: '2021-12-24T12:00:00Z',
    delayed: true,
  },
} satisfies Record<string, Flight>;
