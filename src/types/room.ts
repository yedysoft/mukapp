import {IPlayingTrack} from './media';

export type IRoom = {
  streamerId: string;
  sessionId: string;
  roomName: string;
  streamerName: string;
  liveSong: IPlayingTrack;
  population: number;
  isLive: boolean;
};
