import { Routes } from '@angular/router';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { provideState } from '@ngrx/store';
import { flightSearchFeature } from './flight-search/+store/flight-search';
import { provideEffects } from '@ngrx/effects';
import { flightSearchEffects } from './flight-search/+store/flight-search.effects';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    children: [
      {
        providers: [
          provideState(flightSearchFeature),
          provideEffects(flightSearchEffects),
        ],
        path: 'flight-search',
        component: FlightSearchComponent,
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent,
      },
    ],
  },
];

export default FLIGHT_BOOKING_ROUTES;
