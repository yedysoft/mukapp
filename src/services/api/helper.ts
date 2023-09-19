import {Buffer} from 'buffer';
import {IArtist, IImage} from '../../types/media';

export class HelperApi {
  msToMinSec = (ms: number): string => {
    const minutes: number = Math.floor(ms / 60000);
    const seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < '10' ? '0' : '') + seconds;
  };

  randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

  sleep = (ms: number) => new Promise<void>(resolver => setTimeout(resolver, ms));

  toBase64 = (text: string): string => Buffer.from(text, 'utf-8').toString('base64');

  randomStr = (len = 16) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsLength = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
  };

  getPercent = (min: number, max: number): number => (max === 0 ? 1 : min / max);

  getImageUrl = (images: Array<IImage>, index?: number): string => {
    if (images === undefined || images === null || images.length === 0) {
      return '/src/assets/muk1.png';
    }
    return images[index ?? 0].url;
  };

  getArtist = (artists: Array<IArtist>): string => {
    if (artists === undefined || artists === null || artists.length === 0) {
      return '';
    }
    return artists.map(a => a.name).join(', ');
  };
}
