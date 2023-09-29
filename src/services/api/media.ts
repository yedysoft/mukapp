import {stores} from '../../stores';
import {IArtist, IImage, IPlayingTrack, IPlaylist, IQueueTrack, ITrack, IVoteResult} from '../../types/media';
import subscription from './subscription';
import axiosIns from '../axiosIns';

export class MediaApi {
  async getCurrentUserPlaylists(): PVoid {
    try {
      const response = await axiosIns.get('/media/getCurrentUserPlaylists');
      const playlists = this.getPlaylists(response.data);
      stores.media.set('playlists', playlists);
    } catch (e: any) {
      console.log(e);
    }
  }

  async setPlayingTrack(data: any): PVoid {
    try {
      if (data !== '') {
        const track: IPlayingTrack = this.getTrack(data.item) as IPlayingTrack;
        track.isPlaying = data.is_playing;
        track.progress = data.progress_ms;
        track.palette = data.palette;
        if (track.id !== stores.media.getPlayingTrack.id) {
          await subscription.getQueue();
        }
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
        const updatedItems = stores.media.queue.map(t => (t.id === data.musicId ? {...t, voteCount: data.voteCount} : t));
        updatedItems.sort((a, b) => b.voteCount - a.voteCount);
        stores.media.set('queue', updatedItems);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  private getArtists(state: any): IArtist[] {
    return state.map((artist: any) => ({
      id: artist.id,
      uri: artist.uri,
      name: artist.name,
    }));
  }

  private getImages(state: any): IImage[] {
    return state.map((image: any) => ({
      url: image.url,
      height: image.height,
      width: image.width,
    }));
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

  private getPlaylist(state: any): IPlaylist {
    return {
      id: state.id,
      name: state.name,
      images: this.getImages(state.images),
      tracks: [],
    };
  }

  private getTracks(state: any): ITrack[] {
    return state.map((data: any) => this.getTrack(data));
  }

  private getQueueTracks(state: any): IQueueTrack[] {
    return state.map((data: any) => {
      const track: IQueueTrack = this.getTrack(data.track) as IQueueTrack;
      track.voteCount = data.voteCount;
      return track;
    });
  }

  private getPlaylists(state: any): IPlaylist[] {
    return state.map((data: any) => this.getPlaylist(data));
  }
}

const media = new MediaApi();
export default media;
