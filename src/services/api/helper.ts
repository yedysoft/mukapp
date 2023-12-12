import {Buffer} from 'buffer';
import {IArtist, IImage, IPlaylist} from '../../types/media';
import {responsiveScale} from '../../utils/util';
import {ImageSourcePropType, Linking} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import {ILastMessage} from '../../types/user';
import {PVoid} from '../../types';
import {Children, cloneElement, useRef} from 'react';
import {stores} from '../../stores';

export class HelperApi {
  timeoutIds: {[key: number | string]: NodeJS.Timeout} = {};

  sleep(ms: number, key?: string | number): PVoid {
    if (key && this.timeoutIds[key]) {
      clearTimeout(this.timeoutIds[key]);
    }
    return new Promise<void>(resolver => {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        resolver();
        key && delete this.timeoutIds[key];
      }, ms);
      key && (this.timeoutIds[key] = timeoutId);
    });
  }

  async openURL(url: string): PVoid {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Açılamayan URL: ${url}`);
      }
    } catch (error) {
      console.error('URL açma hatası:', error);
    }
  }

  isColorLight(hexColor: any): boolean {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128;
  }

  generateChildsWithRefs<T>(children: any) {
    return Children.map(children, (child: any) => {
      if (child.ref) {
        return child;
      } else {
        const childRef = useRef<T>(null);
        return cloneElement(child, {...child.props, ref: childRef});
      }
    });
  }

  generateNumberArray(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({length}, (_, index) => start + index);
  }

  formatNumberWithLength(number: number, length: number): string {
    const numberString = String(number);
    const zerosToAdd = Math.max(0, length - numberString.length);
    return '0'.repeat(zerosToAdd) + numberString;
  }

  isEqual(object1: any, object2: any): boolean {
    if (typeof object1 !== typeof object2) {
      return false;
    }
    if (typeof object1 !== 'object' || object1 === null) {
      return object1 === object2;
    }
    if (Object.keys(object1).length !== Object.keys(object2).length) {
      return false;
    }
    for (const key in object1) {
      if (!object2.hasOwnProperty(key)) {
        return false;
      }
      if (typeof object1[key] === 'function' && typeof object2[key] === 'function') {
        if (object1[key].toString() !== object2[key].toString()) {
          return false;
        }
      } else {
        if (!this.isEqual(object1[key], object2[key])) {
          return false;
        }
      }
    }
    return true;
  }

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
    const seconds: number = +((ms % 60000) / 1000).toFixed(0);
    return seconds === 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
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

  clearArray(array: any[]) {
    while (array.length > 0) {
      array.pop();
    }
  }

  isUrl(url: string) {
    const urlRegex = /^(https?|ftp|file):\/\/[^\s/$.?#].\S*$/;
    return urlRegex.test(url);
  }

  hexToRgba(hex: string, a?: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (a) {
      return `rgba(${r},${g},${b},${a})`;
    } else {
      return `rgb(${r},${g},${b})`;
    }
  }

  getKeyByValue(object: any, value: string | number) {
    return Object.keys(object).find(k => object[k] === value);
  }

  getPercent(min: number, max: number): number {
    return max === 0 ? 1 : min / max;
  }

  getImageUrl(images: IImage[], scale: number): ImageSourcePropType {
    if (!images || images.length === 0) {
      return require('../../../assets/noimage-gray.png');
    }
    let closestImage = images[0];
    if (images.length > 1) {
      const width = responsiveScale(scale);
      const height = responsiveScale(scale);
      let closestDistance = Math.abs(images[0].width - width) + Math.abs(images[0].height - height);
      for (let i = 1; i < images.length; i++) {
        const image = images[i];
        const distance = Math.abs(image.width - width) + Math.abs(image.height - height);
        if (distance < closestDistance) {
          closestImage = image;
          closestDistance = distance;
        }
      }
    }
    return typeof closestImage.url === 'string' ? {uri: closestImage.url} : closestImage.url;
  }

  getArtist(artists: IArtist[]): string {
    if (!artists || artists.length === 0) {
      return '';
    }
    return artists.map((a, _) => a.name).join(', ');
  }

  getSelectedPlaylist(playlists: IPlaylist[]): IPlaylist | undefined {
    if (!playlists || playlists.length === 0) {
      return undefined;
    }
    return playlists.find(p => p.selected);
  }

  getLastMessage(messages: IMessage[]): ILastMessage {
    let message: IMessage | null = null;
    if (messages && messages.length > 0) {
      messages.sort((a, b) => {
        const createdAtA = a.createdAt instanceof Date ? a.createdAt.getTime() : a.createdAt;
        const createdAtB = b.createdAt instanceof Date ? b.createdAt.getTime() : b.createdAt;
        return createdAtB - createdAtA;
      });
      message = messages[0];
    }
    return message ? {date: message.createdAt, message: message.text} : {date: 0, message: ''};
  }

  isUserFollows(userId: string) {
    try {
      return !!stores.user.getFollows.find(f => f.userId === userId);
    } catch (e) {
      console.log(e);
    }
  }
}

const helper = new HelperApi();
export default helper;
