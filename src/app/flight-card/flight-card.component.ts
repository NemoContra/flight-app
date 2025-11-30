import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  Output,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Flight } from '../model/flight';
import { CityPipe } from '../shared/city.pipe';
import { StatusToggleComponent } from '../status-toggle/status-toggle.component';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CityPipe, StatusToggleComponent, DatePipe],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent {
  item = input.required<Flight>();
  selected = model<boolean>(false);

  select() {
    this.selected.set(true);
  }

  deselect() {
    this.selected.set(false);
  }
}
