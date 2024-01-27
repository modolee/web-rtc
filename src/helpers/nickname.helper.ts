import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';

export const getRandomNickname = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });
