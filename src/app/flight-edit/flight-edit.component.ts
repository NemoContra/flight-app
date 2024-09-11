import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Flight } from '../model/flight';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [FormsModule, JsonPipe, MatDialogContent, MatDialogTitle],
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.css',
})
export class FlightEditComponent {
  data = inject<{ flight: Flight }>(MAT_DIALOG_DATA);
  matDialogRef = inject(MatDialogRef);

  flight = this.data.flight;

  close() {
    this.matDialogRef.close();
  }
}
