import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightSearchStore } from './+store/flight-search';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [FormsModule, FlightCardComponent, JsonPipe],
  providers: [FlightSearchStore],
})
export class FlightSearchComponent {
  flightSearchStore = inject(FlightSearchStore);
}
