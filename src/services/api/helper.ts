import {Buffer} from 'buffer';
import {IArtist, IImage, IPlaylist} from '../../types/media';
import {Linking} from 'react-native';
import {MukLangPaths, PVoid} from '../../types';
import React, {Children, cloneElement, createRef} from 'react';
import {stores} from '../../stores';
import axiosIns from '../axiosIns';
import translate from '../translate';
import {ImageSource} from 'expo-image';
import {responsiveScale} from '../../utils/util';

class HelperApi {
  timeoutIds: Map<number | string, NodeJS.Timeout> = new Map<number | string, NodeJS.Timeout>();

  sleep = async (ms: number, key?: string | number): PVoid => {
    if (key && this.timeoutIds.get(key)) {
      clearTimeout(this.timeoutIds.get(key));
    }
    return new Promise<void>(resolver => {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        resolver();
        key && this.timeoutIds.delete(key);
      }, ms);
      key && this.timeoutIds.set(key, timeoutId);
    });
  };

  openURL = async (url: string): PVoid => {
    await Linking.openURL(url);
  };

  isColorLight = (hexColor: any): boolean => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128;
  };

  generateChildsWithRefs = <T>(children: any): any[] => {
    return Children.map(children, (child: any) => {
      if (child.ref) {
        return child;
      } else {
        const childRef = createRef<T>();
        return cloneElement(child, {...child.props, ref: childRef});
      }
    });
  };

  generateNumberArray = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({length}, (_, index) => start + index);
  };

  formatNumberWithLength = (number: number, length: number): string => {
    const numberString = String(number);
    const zerosToAdd = Math.max(0, length - numberString.length);
    return '0'.repeat(zerosToAdd) + numberString;
  };

  isEqual = (object1: any, object2: any): boolean => {
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
      if (!Object.prototype.hasOwnProperty.call(object2, key)) {
        return false;
      }
      if (typeof object1[key] === 'function' && typeof object2[key] === 'function') {
        if (object1[key].toString() !== object2[key].toString()) {
          return false;
        }
      } else if (React.isValidElement(object1[key]) && React.isValidElement(object2[key])) {
        if (!this.isEqual(object1[key].props, object2[key].props)) {
          return false;
        }
      } else if (!this.isEqual(object1[key], object2[key])) {
        return false;
      }
    }
    return true;
  };

  nummer = (num: number): string => {
    if (num >= 1e3 && num < 1e6) {
      return parseFloat((num / 1e3).toFixed(2)).toString() + 'K';
    } else if (num >= 1e6 && num < 1e9) {
      return parseFloat((num / 1e6).toFixed(2)).toString() + 'M';
    } else if (num >= 1e9 && num < 1e12) {
      return parseFloat((num / 1e9).toFixed(2)).toString() + 'B';
    } else if (num >= 1e12) {
      return parseFloat((num / 1e12).toFixed(2)).toString() + 'T';
    } else {
      return parseFloat(num.toFixed(2)).toString(); // 100, 500 gibi sayılar için
    }
  };

  msToMinSec = (ms: number): string => {
    const minutes: number = Math.floor(ms / 60000);
    const seconds: number = +((ms % 60000) / 1000).toFixed(0);
    return seconds === 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  toBase64 = (text: string): string => {
    return Buffer.from(text, 'utf-8').toString('base64');
  };

  getSafeArray = <T>(array: T[] | undefined): T[] => {
    if (array) {
      return array;
    }
    return [];
  };

  getPublicIp = async (): Promise<string | null> => {
    let ip: string | null = null;
    try {
      const response = await axiosIns.get<{ip: string}>('https://api64.ipify.org?format=json');
      if (response.status === 200) {
        ip = response.data.ip;
      }
    } catch (e) {
      console.log(e);
    }
    return ip;
  };

  clearArray = (array: any[]) => {
    while (array.length > 0) {
      array.pop();
    }
  };

  isUrl = (url: string) => {
    const urlRegex = /^(https?|ftp|file):\/\/[^\s/$.?#].\S*$/;
    return urlRegex.test(url);
  };

  hexToRgb = (hex: string): {r: number; g: number; b: number} | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = regex.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  parseRgb = (rgb: string): {r: number; g: number; b: number} | null => {
    const regex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const result = regex.exec(rgb);
    return result
      ? {
          r: parseInt(result[1], 10),
          g: parseInt(result[2], 10),
          b: parseInt(result[3], 10),
        }
      : null;
  };

  parseRgba = (rgba: string): {r: number; g: number; b: number; a: number} | null => {
    const regex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
    const result = regex.exec(rgba);
    return result
      ? {
          r: parseInt(result[1], 10),
          g: parseInt(result[2], 10),
          b: parseInt(result[3], 10),
          a: parseFloat(result[4]),
        }
      : null;
  };

  addOpacityToColor = (color: string, opacity: number): string => {
    let rgb;
    if (color.startsWith('#')) {
      rgb = this.hexToRgb(color);
    } else if (color.startsWith('rgb(')) {
      rgb = this.parseRgb(color);
    } else if (color.startsWith('rgba(')) {
      const rgba = this.parseRgba(color);
      if (rgba) {
        rgb = {r: rgba.r, g: rgba.g, b: rgba.b};
        opacity *= rgba.a;
      }
    }
    if (!rgb) {
      throw new Error(`Geçersiz renk formatı: ${color}`);
    }
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  };

  hexToRgba = (hex: string, a?: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (a) {
      return `rgba(${r},${g},${b},${a})`;
    } else {
      return `rgb(${r},${g},${b})`;
    }
  };

  getKeyByValue = (object: any, value: string | number) => {
    return Object.keys(object).find(k => object[k] === value);
  };

  getPercent = (min: number, max: number): number => {
    return max === 0 ? 1 : min / max;
  };

  getImageUrl = (images: IImage[], scale: number): ImageSource | ImageSource[] | undefined => {
    if (!images || images.length === 0) {
      return undefined;
    }
    console.log('images', images);
    if (images.length > 0) {
      return [...images] as ImageSource[];
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
    return closestImage as ImageSource;
  };

  getArtist = (artists: IArtist[] | undefined): string => {
    if (!artists || artists.length === 0) {
      return '';
    }
    return artists.map((a, _) => a.name).join(', ');
  };

  getSelectedPlaylist = (playlists: IPlaylist[]): IPlaylist | undefined => {
    if (!playlists || playlists.length === 0) {
      return undefined;
    }
    return playlists.find(p => p.selected);
  };

  calculateDaysBetweenDates = (startDate: Date, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    return Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay));
  };

  formatDateTime = (value: number | string, type: 'both' | 'date' | 'time') => {
    const date = new Date(value);
    let d = '';
    let t = '';
    if (type === 'both' || type === 'date') {
      const diff = this.calculateDaysBetweenDates(date, new Date());
      if (diff === 0) {
        d = 'Bugün';
      } else if (diff === 1) {
        d = 'Dün';
      } else {
        d = date.toLocaleString('tr-tr', {timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long', year: 'numeric'});
      }
    }
    if (type === 'both' || type === 'time') {
      t = date.toLocaleString('tr-tr', {timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit'});
    }
    return `${d}${type === 'both' ? ' ' : ''}${t}`;
  };

  dateAgo = (date: Date) => {
    const currentDatetime = new Date();
    const timeDifference = currentDatetime.getTime() - date.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const secondsAgo = Math.floor(timeDifference / 1000);
    let result;

    if (secondsAgo < 60) {
      result = `${secondsAgo}s`;
    } else if (minutesAgo < 60) {
      result = `${minutesAgo}m`;
    } else if (hoursAgo < 24) {
      result = `${hoursAgo}h`;
    } else {
      result = `${daysAgo}d`;
    }

    return result;
  };

  formatAMPM = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${hours}:${minutesStr} ${ampm}`;
  };

  dateFormatted = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}, ${this.formatAMPM(
      date,
    )}`;
  };

  luminance = (r: number, g: number, b: number): number => {
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  };

  randomColor = (): string => {
    const bgColor = stores.ui.getTheme.colors.background;
    const bgR = parseInt(bgColor.substring(1, 3), 16);
    const bgG = parseInt(bgColor.substring(3, 5), 16);
    const bgB = parseInt(bgColor.substring(5, 7), 16);

    let r, g, b;
    do {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
    } while (Math.abs(this.luminance(bgR, bgG, bgB) - this.luminance(r, g, b)) < 0.2);

    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    return `#${hexR}${hexG}${hexB}`;
  };

  arrayToMap = <T extends string | number>(values: readonly T[], name: string): Record<T, string> => {
    return values.reduce((acc, value) => {
      acc[value] = translate.do(`enum.${name}.${value}` as MukLangPaths);
      return acc;
    }, {} as Record<T, string>);
  };
}

const helper = new HelperApi();
export default helper;
