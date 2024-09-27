import {IPlayingTrack} from './media';
import {IImage} from './user';

export type IRoom = {
  streamerId: string;
  sessionId: string;
  roomName: string;
  streamerName: string;
  liveSong: IPlayingTrack | null;
  population: number;
  isLive: boolean;
  image: IImage | null;
};

export type IRoomSession = {
  id: string;
  sessionId: string;
};

export type IRoomConfig = {
  id: string;
  roomId: string;
  name: string;
  image: IImage | null;
};

export type IRoomLeaderboard = {
  userId: string;
  userName: string;
  voteCount: number;
  image: IImage | null;
};
