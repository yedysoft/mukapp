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

export type IRoomSession = {
  id: string;
  streamerId: string;
};

export type IRoomConfig = {
  id: string;
  roomId: string;
  name: string;
};
