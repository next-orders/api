import { Options } from '@dicebear/open-peeps';
import { StyleOptions } from '@dicebear/core';

const male: Partial<StyleOptions<Options>> = {
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'flatTop',
    'flatTopLong',
    'grayShort',
    'hatBeanie',
    'mohawk',
    'mohawk2',
    'noHair1',
    'noHair2',
    'noHair3',
    'pomp',
    'shaved2',
    'shaved3',
    'short1',
    'short2',
    'short3',
    'short4',
    'short5',
    'twists',
    'twists2',
  ],
  facialHairProbability: 10,
  facialHair: [
    'chin',
    'full',
    'full2',
    'full3',
    'full4', // with color
    'goatee1',
    'goatee2',
    'moustache1',
    'moustache2',
    'moustache3',
    'moustache4',
    'moustache5',
    'moustache6',
    'moustache7',
    'moustache9', // with color
  ],
};

const female: Partial<StyleOptions<Options>> = {
  facialHairProbability: 0,
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'bangs',
    'bangs2',
    'bantuKnots',
    'bun',
    'bun2',
    'buns',
    'cornrows',
    'cornrows2',
    'grayBun',
    'grayMedium',
    'long',
    'longBangs',
    'longCurly',
    'medium1',
    'medium2',
    'medium3',
    'mediumBangs',
    'mediumBangs2',
    'mediumBangs3',
    'mediumStraight',
    'shaved1',
  ],
};

export const getRandInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const choosePartsByGender = (gender: string | undefined) => {
  if (!gender) {
    const sexVariants = ['male', 'female'];
    const randomSex =
      sexVariants[Math.floor(Math.random() * sexVariants.length)];

    return randomSex === 'male' ? male : female;
  }

  if (gender.toLowerCase() === 'male') return male;
  if (gender.toLowerCase() === 'female') return female;
};

export const clearSvg = (svg: string) => {
  return svg
    .replace(/<metadata.*?>.*?<\/metadata>/gi, '')
    .replace(/<desc.*?>.*?<\/desc>/gi, '');
};

export const generateHSL = () => {
  const background1 = [
    getRandInteger(0, 360),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ];
  const background2 = [
    background1[0] - getRandInteger(25, 70),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ];

  const backgroundColor1 = `hsl(${background1[0]}deg ${background1[1]}% ${background1[2]}%)`;
  const backgroundColor2 = `hsl(${background2[0]}deg ${background2[1]}% ${background2[2]}%)`;

  return [backgroundColor1, backgroundColor2];
};
