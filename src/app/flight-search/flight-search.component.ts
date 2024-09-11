import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightStore } from '../+state/flight.store';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  imports: [FormsModule, DatePipe, FlightCardComponent, JsonPipe],
  styleUrl: './flight-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlightStore],
})
export class FlightSearchComponent {
  from = signal('London');
  to = signal('Paris');
  flightStore = inject(FlightStore);
}
