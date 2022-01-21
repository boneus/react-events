export interface IEvent {
  date: string;
  description: string;
  guest: string;
  author: string;
  id: number;
}

export type TNewEvent = Omit<IEvent, 'id'>;
