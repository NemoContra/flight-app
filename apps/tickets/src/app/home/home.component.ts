import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { counterActions, counterFeature } from '../+store/counter';

const isHTMLInputElement = (
  target: EventTarget | null
): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  store = inject(Store);
  count = this.store.selectSignal(counterFeature.selectCount);
  doubleCount = this.store.selectSignal(counterFeature.selectDoubleCount);

  increment() {
    this.store.dispatch(counterActions.increment());
  }

  decrement() {
    this.store.dispatch(counterActions.decrement());
  }

  incrementBy2() {
    this.store.dispatch(counterActions.incrementBy({ number: 2 }));
  }

  decrementBy2() {
    this.store.dispatch(counterActions.decrementBy({ number: 2 }));
  }

  onKeydownEnter(event: KeyboardEvent) {
    if (isHTMLInputElement(event.target)) {
      console.log(event.target.value);
    }
  }

  onKeydownEvent2({ target: { value } }: { target: HTMLInputElement }) {
    console.log(value);
  }

  onKeydownEnter3({ target }: KeyboardEvent) {
    if (target instanceof HTMLInputElement) {
      console.log(target.value);
    }
  }
}
