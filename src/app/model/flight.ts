export abstract class Flight {
  abstract id: number;
  abstract from: string;
  abstract to: string;
  abstract date: string;
  abstract delayed: boolean;
}
