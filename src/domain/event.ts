import { Theme } from './theme';

export interface UserEvent {
  id: number;
  name: string;
  location: string;
  startDate: {
    date: Date;
    dateString: string;
    month: string;
    day: string;
  };
  endDate: {
    date: Date;
    dateString: string;
    month: string;
    day: string;
  };
  theme: Theme;
  price: number;
}
