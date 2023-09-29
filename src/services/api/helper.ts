import {Buffer} from 'buffer';
import {IArtist, IImage} from '../../types/media';

export class HelperApi {
  nummer(num: number): string{
    if (num > 1e3 - 1 && num < 1e6) {
      return (num / 1e3) + "K";
    } else if (num > 1e6 - 1 && num < 1e9) {
      return (num / 1e6) + "M";
    } else if (num > 1e9 - 1 && num < 1e12) {
      return (num / 1e9) + "B";
    } else if (num > 1e12) {
      return (num / 1e12) + "T";
    } else if (num < 9e2) {
      return num.toString();
    } else return num.toString()
  };

  msToMinSec(ms: number): string {
    const minutes: number = Math.floor(ms / 60000);
    const seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < '10' ? '0' : '') + seconds;
  }

  sleep(ms: number): PVoid {
    return new Promise<void>(resolver => setTimeout(resolver, ms));
  }

  toBase64(text: string): string {
    return Buffer.from(text, 'utf-8').toString('base64');
  }

  getSafeArray<T>(array: T[] | undefined): T[] {
    if (array) {
      return array;
    }
    return [];
  }

  getPercent(min: number, max: number): number {
    return max === 0 ? 1 : min / max;
  }

  getImageUrl(images: Array<IImage>, index?: number): string {
    if (images === undefined || images === null || images.length === 0) {
      return '/src/assets/muk1.png';
    }
    return images[index ?? 0].url;
  }

  getArtist(artists: Array<IArtist>): string {
    if (artists === undefined || artists === null || artists.length === 0) {
      return '';
    }
    return artists.map(a => a.name).join(', ');
  }
}

const helper = new HelperApi();
export default helper;
