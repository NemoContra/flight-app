import { createHostFactory } from '@ngneat/spectator/jest';
import { FlightCardComponent } from './flight-card.component';
import { Flight } from '../model/flight';

describe('FlightCardComponent', () => {
  const createComponent = createHostFactory(FlightCardComponent);

  it('should render a card', () => {
    const spectator = createComponent(
      `<app-flight-card selected="false" [item]="item">`,
      {
        hostProps: {
          item: {
            id: 1,
            from: 'London',
            to: 'Paris',
            date: '2021-12-24T12:00:00Z',
            delayed: false,
          } satisfies Flight,
        },
      },
    );

    expect(spectator.fixture).toMatchSnapshot();
  });
});
