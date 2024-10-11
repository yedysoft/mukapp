import {stores} from '../../stores';
import {
  IArtist,
  IImage,
  IPlayingTrack,
  IPlaylist,
  IQueueTrack,
  ISearchResult,
  ITrack,
  IVoteResult,
} from '../../types/media';
import axiosIns from '../axiosIns';
import {PVoid} from '../../types';

class MediaApi {
  getAuthUrl = async (): Promise<string> => {
    try {
      const response = await axiosIns.get<string>('/media/getAuthUrl');
      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.log(e);
    }
    return '';
  };

  private searchTracks = async (q: string, offset = 0, limit = 10): Promise<ISearchResult> => {
    let result: ISearchResult = {tracks: [], total: 0};
    try {
      stores.media.set('searchValue', q);
      const response = await axiosIns.get<ISearchResult>(`/media/searchTracks?q=${q}&offset=${offset}&limit=${limit}`);
      if (response.status === 200) {
        result = response.data;
      }
    } catch (e: any) {
      console.log(e);
    }
    return result;
  };

  getCurrentUserPlaylists = async (): PVoid => {
    try {
      stores.loading.set('userPlaylist', true);
      const response = await axiosIns.get<IPlaylist[]>('/media/getCurrentUserPlaylists');
      const playlists: IPlaylist[] = response.data;
      playlists.unshift({
        id: 'search',
        name: 'Search Songs',
        selected: true,
        images: [{url: 'search', width: 128, height: 128}],
        tracks: {items: [], total: 0, count: 0},
      });
      stores.media.set('playlists', playlists);
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('userPlaylist', false);
    }
  };

  getPlaylistTracks = async (playlistId: string, isSelect?: boolean, q?: string, searching?: boolean): PVoid => {
    try {
      stores.loading.set('playlistTracks', true);
      const playlist = stores.media.getPlaylists.find(p => p.id === playlistId);
      let total: number;
      let clear = false;
      let tracks: ITrack[] = [];
      if (
        !isSelect &&
        playlist &&
        (playlist.tracks.count < playlist.tracks.total || (playlist.id === 'search' && (q || q === '')))
      ) {
        const offset = playlist.tracks.count;
        if (playlist.id === 'search' && (q || q === '')) {
          stores.media.set('searchValue', q);
          if (searching || q === '') {
            clear = true;
          }
          if (q) {
            const result = await this.searchTracks(q, searching ? 0 : offset);
            total = result.total;
            tracks = this.getTracks(result.tracks);
          }
        } else if (playlist.id !== 'search') {
          const response = await axiosIns.get(`/media/getPlaylistTracks/${playlistId}?limit=10&offset=${offset}`);
          if (response.status === 200) {
            tracks = this.getTracks(response.data.map((d: any, _: number) => d.track));
          }
        }
      }
      stores.media.set('playlists', v =>
        v.map((p, _) =>
          p.id === playlistId
            ? {
                ...p,
                selected: true,
                tracks: {
                  items: clear ? [] : [...p.tracks.items, ...tracks],
                  total: total ?? p.tracks.total,
                  count: p.tracks.items.length + tracks.length,
                },
              }
            : {...p, selected: false},
        ),
      );
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('playlistTracks', false);
    }
  };

  setPlayingTrack = async (data: any): PVoid => {
    try {
      const playingTrack = await this.getPlayingTrack(data);
      if (playingTrack) {
        stores.media.set('playingTrack', playingTrack);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  getPlayingTrack = async (data: any): Promise<IPlayingTrack | null> => {
    let playingTrack: IPlayingTrack | null = null;
    try {
      if (data && data !== '') {
        const track: IPlayingTrack = this.getTrack(data.item) as IPlayingTrack;
        track.isPlaying = data.is_playing;
        track.progress = data.progress_ms;
        track.dominantColor = data.dominantColor;
        track.voteable = data.voteable;
        playingTrack = track;
      }
    } catch (e: any) {
      console.log(e);
    }
    return playingTrack;
  };

  setQueue = async (data: any): PVoid => {
    try {
      const queue: IQueueTrack[] = this.getQueueTracks(data);
      queue.sort((a, b) => b.voteCount - a.voteCount);
      stores.media.set('queue', queue);
    } catch (e: any) {
      console.log(e);
    }
  };

  setVoteResult = async (data: IVoteResult): PVoid => {
    try {
      if (stores.media.getQueue.length > 0) {
        const updatedItems = stores.media.getQueue.map((t, _) =>
          t.uri === data.musicUri ? {...t, voteCount: data.voteCount} : t,
        );
        updatedItems.sort((a, b) => b.voteCount - a.voteCount);
        stores.media.set('queue', updatedItems);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  private getArtists = (state: any): IArtist[] => {
    return state
      ? state.map((artist: any, _: number) => ({
          id: artist.id,
          uri: artist.uri,
          name: artist.name,
        }))
      : [];
  };

  private getImages = (state: any): IImage[] => {
    return state
      ? state.map((image: any, _: number) => ({
          url: image.url,
          height: image.height,
          width: image.width,
        }))
      : [];
  };

  private getTracks = (state: any): ITrack[] => {
    return state ? state.map((data: any, _: number) => this.getTrack(data)) : [];
  };

  getQueueTracks = (state: any): IQueueTrack[] => {
    return state
      ? state.map((data: any, _: number) => {
          const track: IQueueTrack = this.getTrack(data.track) as IQueueTrack;
          track.voteCount = data.voteCount ?? data.total;
          return track;
        })
      : [];
  };

  private getTrack = (state: any): ITrack => {
    return {
      id: state.id,
      uri: state.uri,
      name: state.name,
      artists: this.getArtists(state.artists),
      images: this.getImages(state.album.images),
      duration: state.durationMs,
    };
  };
}

const media = new MediaApi();
export default media;
