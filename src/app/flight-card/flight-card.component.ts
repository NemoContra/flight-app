import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Flight } from '../model/flight';
import { CityPipe } from '../shared/city.pipe';
import { MatDialog } from '@angular/material/dialog';
import { FlightEditComponent } from '../flight-edit/flight-edit.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CityPipe, NgClass, NgStyle, DatePipe],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent {
  item = input.required<Flight>();
  selected = model<boolean>(false);

  toggleSelected() {
    this.selected.update((selected) => !selected);
  }

  dialog = inject(MatDialog);

  edit() {
    this.dialog.open(FlightEditComponent, {
      data: { flight: this.item() },
    });
  }
}
