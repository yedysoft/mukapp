import {Buffer} from 'buffer';
import {IArtist, IImage, IPlaylist, ITrack} from '../../types/media';
import {responsiveScale} from '../../utils/Responsive';

export class HelperApi {
  nummer(num: number): string {
    if (num > 1e3 - 1 && num < 1e6) {
      return num / 1e3 + 'K';
    } else if (num > 1e6 - 1 && num < 1e9) {
      return num / 1e6 + 'M';
    } else if (num > 1e9 - 1 && num < 1e12) {
      return num / 1e9 + 'B';
    } else if (num > 1e12) {
      return num / 1e12 + 'T';
    } else if (num < 9e2) {
      return num.toString();
    } else {
      return num.toString();
    }
  }

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

  getImageUrl(images: IImage[], scale: number): string {
    if (images === undefined || images === null || images.length === 0) {
      return '/assets/logo.png';
    }
    const width = responsiveScale(scale);
    const height = responsiveScale(scale);
    let closestImage = images[0];
    let closestDistance = Math.abs(images[0].width - width) + Math.abs(images[0].height - height);
    for (let i = 1; i < images.length; i++) {
      const image = images[i];
      const distance = Math.abs(image.width - width) + Math.abs(image.height - height);
      if (distance < closestDistance) {
        closestImage = image;
        closestDistance = distance;
      }
    }

    return closestImage.url;
  }

  getArtist(artists: IArtist[]): string {
    if (artists === undefined || artists === null || artists.length === 0) {
      return '';
    }
    return artists.map(a => a.name).join(', ');
  }

  getSelectedPlaylistTracks(playlists: IPlaylist[]): ITrack[] {
    if (playlists === undefined || playlists === null || playlists.length === 0) {
      return [];
    }
    const playlist = playlists.find(p => p.selected);
    return playlist ? playlist.tracks : [];
  }
}

const helper = new HelperApi();
export default helper;
