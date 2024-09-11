import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './model/flight';

const url = 'https://demo.angulararchitects.io/api/flight';
const headers = {
  Accept: 'application/json',
};

export const injectFlights = () => {
  const httpClient = inject(HttpClient);

  return {
    getFlights: (params: { from: string; to: string }) => {
      return httpClient.get<Flight[]>(url, {
        params,
        headers,
      });
    },
    saveFlight: (flight: Flight) => {
      return httpClient.post<Flight>(url, flight, { headers });
    },
  };
};
