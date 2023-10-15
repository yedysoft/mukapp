import {stores} from '../../stores';
import {IArtist, IImage, IPlayingTrack, IPlaylist, IQueueTrack, ITrack, IVoteResult} from '../../types/media';
import axiosIns from '../axiosIns';

export class MediaApi {
  async getAuthUrl(): Promise<string> {
    try {
      const response = await axiosIns.get('/media/getAuthUrl');
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
    return '';
  }

  async searchTracks(q: string, offset = 0, limit = 10): Promise<ITrack[]> {
    let tracks: ITrack[] = [];
    try {
      const response = await axiosIns.get(`/media/searchTracks?q=${q}&offset=${offset}&limit=${limit}`);
      tracks = response.data;
    } catch (e: any) {
      console.log(e);
    }
    return tracks;
  }

  async getCurrentUserPlaylists(): PVoid {
    try {
      stores.loading.set('userPlaylist', true);
      const response = await axiosIns.get('/media/getCurrentUserPlaylists');
      const playlists: IPlaylist[] = response.data;
      playlists.unshift({
        id: 'search',
        name: 'Arama',
        selected: true,
        images: [{url: require('../../../assets/search.png'), width: 128, height: 128}],
        tracks: {items: [], total: 0, count: 0},
      });
      stores.media.set('playlists', playlists);
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('userPlaylist', false);
    }
  }

  async getPlaylistTracks(playlistId: string, q?: string): PVoid {
    try {
      stores.loading.set('playlistTracks', true);
      const playlist = stores.media.getPlaylists.find(p => p.id === playlistId);
      if (playlist && playlist.tracks.count < playlist.tracks.total) {
        const offset = playlist.tracks.count;
        if (playlist.id === 'search' && q) {
          const tracks = await this.searchTracks(q, offset);
          playlist.tracks.items.push(...tracks);
        } else if (playlist.id !== 'search') {
          const response = await axiosIns.get(`/media/getPlaylistTracks/${playlistId}?limit=10&offset=${offset}`);
          const tracks = this.getTracks(response.data.map((d: any) => d.track));
          playlist.tracks.items.push(...tracks);
        }
      }
      const playlists = stores.media.getPlaylists.map(p =>
        p.id === playlistId
          ? {...p, selected: true, tracks: {...p.tracks, count: p.tracks.items.length}}
          : {...p, selected: false},
      );
      stores.media.set('playlists', playlists);
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('playlistTracks', false);
    }
  }

  async setPlayingTrack(data: any): PVoid {
    try {
      if (data !== '') {
        const track: IPlayingTrack = this.getTrack(data.item) as IPlayingTrack;
        track.isPlaying = data.is_playing;
        track.progress = data.progress_ms;
        track.dominantColor = data.dominantColor;
        stores.media.set('playingTrack', track);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async setQueue(data: any): PVoid {
    try {
      const queue: IQueueTrack[] = this.getQueueTracks(data);
      queue.sort((a, b) => b.voteCount - a.voteCount);
      stores.media.set('queue', queue);
    } catch (e: any) {
      console.log(e);
    }
  }

  async setVoteResult(data: IVoteResult): PVoid {
    try {
      if (stores.media.queue.length > 0) {
        const updatedItems = stores.media.queue.map(t =>
          t.id === data.musicId ? {...t, voteCount: data.voteCount} : t,
        );
        updatedItems.sort((a, b) => b.voteCount - a.voteCount);
        stores.media.set('queue', updatedItems);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  private getArtists(state: any): IArtist[] {
    return state
      ? state.map((artist: any) => ({
          id: artist.id,
          uri: artist.uri,
          name: artist.name,
        }))
      : [];
  }

  private getImages(state: any): IImage[] {
    return state
      ? state.map((image: any) => ({
          url: image.url,
          height: image.height,
          width: image.width,
        }))
      : [];
  }

  private getTracks(state: any): ITrack[] {
    return state ? state.map((data: any) => this.getTrack(data)) : [];
  }

  private getQueueTracks(state: any): IQueueTrack[] {
    return state
      ? state.map((data: any) => {
          const track: IQueueTrack = this.getTrack(data.track) as IQueueTrack;
          track.voteCount = data.voteCount;
          return track;
        })
      : [];
  }

  private getTrack(state: any): ITrack {
    return {
      id: state.id,
      uri: state.uri,
      name: state.name,
      artists: this.getArtists(state.artists),
      images: this.getImages(state.album.images),
      duration: state.durationMs,
    };
  }
}

const media = new MediaApi();
export default media;
