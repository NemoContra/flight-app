import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flight';
import { ConfigService } from '../shared/config.service';
import { FlightService } from './flight.service';

@Injectable()
export class DefaultFlightService implements FlightService {
  private http = inject(HttpClient);

  find(from: string, to: string): Observable<Flight[]> {
    const url = `https://demo.angulararchitects.io/api/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { from, to };

    return this.http.get<Flight[]>(url, { headers, params });
  }
}
