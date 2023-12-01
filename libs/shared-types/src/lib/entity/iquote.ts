export interface IQuote {
  id: string;
  name: string;
  surname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  solarApiResponse: any;
  dateCreated: Date;
  dateUpdated: Date;
}
