export class Event {
  constructor(
    public name: string,
    public desc: string,
    public url: string,
    public dates: {
      multipleDays: boolean,
      startDate: Date,
      endDate: Date
    }
  ) { }
}
