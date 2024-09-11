import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Flight } from '../model/flight';
import { CityPipe } from '../shared/city.pipe';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CityPipe, NgClass, NgStyle, DatePipe],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent {
  item = input.required<Flight>();
  selected = model<boolean>(false);

  toggleSelected() {
    this.selected.update((selected) => !selected);
  }
}
