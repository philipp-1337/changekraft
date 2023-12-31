interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export class Event {
  constructor(
    public name: string,
    public desc: string,
    public url: string,
    public link: string,
    public linkLabel: string,
    public dates: {
      multipleDays: boolean,
      startDate: Timestamp,
      endDate: Timestamp
    },
    public images: {
      iconUrl: string,
      headerUrl: string
    }
  ) { }
}
