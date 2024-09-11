import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  standalone: true,
  template: `
    <button (click)="buttonClicked.emit($event)" [disabled]="disabled()">
      Click me!
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'wrapperClicked.emit($event)',
  },
  selector: 'wrapped-button',
  styles: `
    :host {
    }
  `,
})
export class WrappedButtonComponent {
  disabled = input(false, { transform: booleanAttribute });

  value = signal<string>('Hello World!');

  buttonClicked = output<MouseEvent>();
  wrapperClicked = output<MouseEvent>();

  enabled = computed(() => !this.disabled());

  constructor() {
    effect(() => {
      console.log('enabled', this.enabled());
    });
  }
}
