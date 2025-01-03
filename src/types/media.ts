export type IArtist = {
  id: string;
  uri: string;
  name: string;
};

export type IImage = {
  uri: string;
  height: number;
  width: number;
};

export type ITrack = {
  id: string;
  uri: string;
  name: string;
  artists: IArtist[];
  images: IImage[];
  duration: number;
};

export type IQueueTrack = ITrack & {
  voteCount: number;
};

export type IPlayingTrack = ITrack & {
  progress: number;
  isPlaying: boolean;
  dominantColor: string | undefined;
  voteable: boolean;
};

export type IPlaylist = {
  id: string;
  name: string;
  images: IImage[];
  tracks: IPlaylistTracks;
  selected: boolean;
};

export type IPlaylistTracks = {
  items: ITrack[];
  total: number;
  count: number;
};

export type ISearchResult = {
  tracks: ITrack[];
  total: number;
};

export type IVote = {
  userId: string | null;
  musicUri: string;
};

export type IVoteResult = {
  musicUri: string;
  voteCount: number;
};
