export class RsvpData {
  constructor(
    public name: string,
    public email: string,
    public teilnahme: boolean,
    public begleitung: boolean,
    public hund: boolean,
    public kinder: number,
    public anreise: string,
    public anDate: Date,
    public abDate: Date,
    public nights: number,
    public unterkunft: string
  ) {}
}
