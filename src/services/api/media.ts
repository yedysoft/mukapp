import {stores} from '../../stores';
import {IArtist, IImage, IPlayingTrack, IPlaylist, IQueueTrack, ITrack} from '../../types/media';

export class MediaApi {
  async setPlayingTrack(data: any): PVoid {
    try {
      if (data !== '') {
        const track: IPlayingTrack = this.getTrack(data.item);
        track.isPlaying = data.is_playing;
        track.progress = data.progress_ms;
        track.palette = data.palette;
        stores.media.set('playingTrack', track);
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
      const track: IQueueTrack = this.getTrack(data.track);
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
