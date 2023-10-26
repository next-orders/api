import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { PossibleEmotion } from '@/avatar/types';
import { Options } from '@dicebear/open-peeps';
import { StyleOptions } from '@dicebear/core';
import { choosePartsByGender, clearSvg, generateHSL } from '@/avatar/helpers';

const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

@Controller('avatar')
export class AvatarController {
  @Header('Cache-Control', 'public, max-age=31536000, immutable')
  @Header('Content-Type', 'image/svg+xml')
  @Get(':seed')
  async generateSVGAvatar(
    @Param('seed') seed: string,
    @Query('gender') gender: string,
    @Query('size') size: string,
    @Query('emotion') emotion: string,
  ) {
    const sizeNumber = size ? Number(size) : 150;
    const emotionNumber = emotion ? Number(emotion) : null;

    // 1 to 10
    const emotions: PossibleEmotion[] = [
      'rage',
      'veryAngry',
      'solemn',
      'tired',
      'serious',
      'eyesClosed',
      'smile',
      'calm',
      'eatingHappy',
      'lovingGrin1',
    ];

    let emotionChosen: PossibleEmotion | null = null;

    if (emotionNumber && emotionNumber >= 1 && emotionNumber <= 10) {
      emotionChosen = emotions[emotionNumber - 1];
    }

    const allFaces: Options['face'] = [
      ...emotions,
      'suspicious',
      'contempt',
      'hectic',
      'driven',
      'smileTeethGap',
      'smileLOL',
      'smileBig',
      'lovingGrin2',
      'fear',
      'explaining',
      'cute',
      'concernedFear',
      'concerned',
      'cheeky',
      'blank',
      'awe',
    ];

    const face = emotionChosen ? [emotionChosen] : allFaces;

    const options: Partial<StyleOptions<Options>> = {
      seed,
      face,
      size: sizeNumber,
      accessoriesProbability: 20,
      accessories: [
        'glasses',
        'glasses2',
        'glasses3',
        'glasses4',
        'glasses5',
        'sunglasses',
        'sunglasses2',
      ],
      maskProbability: 0,
      skinColor: ['fce5d3'],
      scale: 80,
      translateX: -5,
      ...choosePartsByGender(gender),
    };

    const openPeeps = await dynamicImport('@dicebear/open-peeps');
    const core: { createAvatar: any } = await dynamicImport('@dicebear/core');

    const createAvatar = core.createAvatar;
    const svg = createAvatar(openPeeps, options).toString();

    const [backgroundColor1, backgroundColor2] = generateHSL();

    const gradient = `
    <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="${backgroundColor1}" />
      <stop offset="1" stop-color="${backgroundColor2}"/>
    </linearGradient>
    <rect xmlns="http://www.w3.org/2000/svg" fill="url(#linear-gradient)" width="704" height="704" x="0" y="0"/>`;

    const svgWithBackground = svg.replace(/<g transform/, `${gradient} $&`);
    return clearSvg(svgWithBackground);
  }
}
