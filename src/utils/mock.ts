import { faker } from '@faker-js/faker';

export const getRandomItem = <T>(arr: T[]): T => {
  const item = arr[faker.number.int({ min: 0, max: arr.length - 1 })];
  return item;
};
