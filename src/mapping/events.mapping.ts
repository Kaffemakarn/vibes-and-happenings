import { faker } from '@faker-js/faker';
import { sortBy } from 'lodash';
import { EpisodeResult } from 'src/components/EventList/EventList';
import { UserEvent } from 'src/domain/event';
import { Status } from 'src/domain/status';
import { Theme } from 'src/domain/theme';
import { getRandomItem } from 'src/utils/mock';

export const mapEvents = (data: EpisodeResult | undefined) => {
  if (!data) return [];

  const events = data.episodes.results.reduce<UserEvent[]>((acc, cur) => {
    const theme = getRandomItem(Object.values(Theme));
    const date = () => {
      const startDate = faker.date.future();
      const startMonth = startDate.toLocaleString('default', { month: 'short' });
      const startDay = startDate.toLocaleString('default', { day: '2-digit' });

      const endDate = faker.date.future({ refDate: startDate });
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      const endDay = endDate.toLocaleString('default', { day: '2-digit' });

      return {
        startDate: {
          date: startDate,
          dateString: startDate.toLocaleTimeString('default', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          month: `${startMonth.slice(0, 3)}.`.toUpperCaseLetters(),
          day: startDay,
        },
        endDate: {
          date: endDate,
          dateString: endDate.toLocaleTimeString('default', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          month: `${endMonth.slice(0, 3)}.`.toUpperCaseLetters(),
          day: endDay,
        },
      };
    };

    const price = () => {
      const character = getRandomItem(data.characters.results);
      if (character.status === Status.ALIVE) return Math.round(character.id * 12.3);
      return 0;
    };

    const location = getRandomItem(data.locations.results);

    acc.push({
      id: cur.id,
      name: cur.name,
      theme,
      startDate: date().startDate,
      endDate: date().endDate,
      price: price(),
      location: location.name,
    });
    return acc;
  }, []);

  return sortBy(events, (event) => {
    return event.startDate.date;
  });
};
