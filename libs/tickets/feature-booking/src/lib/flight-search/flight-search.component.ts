import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { JsonPipe } from '@angular/common';
import { injectFlightSearchFacade } from './+store/flight-search-facade';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [FormsModule, FlightCardComponent, JsonPipe],
})
export class FlightSearchComponent {
  flightSearchFacade = injectFlightSearchFacade();
}
