import {IPlayingTrack} from './media';

export type IRoom = {
  id: string;
  roomName: string;
  userName: string;
  liveSong: IPlayingTrack;
  population: number;
  isLive: boolean
};
