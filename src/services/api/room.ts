import subscription from './subscription';
import {stores} from '../../stores';
import axiosIns from '../axiosIns';
import {IRoom, IRoomConfig, IRoomLeaderboard, IRoomSession} from '../../types/room';
import defaults from '../../utils/defaults';
import {IPage, PVoid} from '../../types';
import media from './media';

class RoomApi {
  createRoom = async (config: IRoomConfig): PVoid => {
    try {
      stores.loading.set('createRoom', true);
      await this.saveConfig(config);
      const response = await axiosIns.get<IRoomSession>(`/room-session/start/${stores.user.info.id}`);
      const session: IRoomSession = response.data;
      await this.openRoom(session.sessionId, session.id);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('createRoom', false);
    }
  };

  openRoom = async (sessionId: string, streamerId: string): PVoid => {
    try {
      await this.closeRoom(sessionId);
      stores.room.setMany({sessionId: sessionId, streamerId: streamerId});
      await subscription.roomSubscribes();
    } catch (e) {
      console.log(e);
    }
  };

  closeRoom = async (sessionId?: string): PVoid => {
    try {
      if (stores.room.live && (!sessionId || sessionId !== stores.room.sessionId)) {
        if (stores.room.isAdmin) {
          await axiosIns.get(`/room-session/stop/${stores.room.sessionId}`);
        }
        await subscription.roomUnsubscribes();
      }
      stores.room.setMany({sessionId: null, streamerId: null, chat: []});
      stores.media.setMany({playingTrack: defaults.playingTrack, queue: [], playlists: [], searchValue: ''});
    } catch (e) {
      console.log(e);
    }
  };

  getRooms = async (role: string, useLoading: boolean | undefined = true): PVoid => {
    useLoading && stores.loading.set('roomList', true);
    try {
      const response = await axiosIns.get(`/custom/getPlaces/${role}`);
      if (response.status === 200) {
        const rooms: IRoom[] = [];
        for (const r of response.data) {
          const room: IRoom = {
            streamerId: r.streamerId,
            sessionId: r.sessionId,
            roomName: r.roomName,
            streamerName: r.streamerName,
            population: r.population,
            isLive: r.isLive,
            liveSong: await media.getPlayingTrack(r.liveSong),
            image: r.image,
          };
          rooms.push(room);
        }
        stores.room.set(role === 'PLACE' ? 'places' : 'users', rooms);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      useLoading && stores.loading.set('roomList', false);
    }
  };

  findByRoomId = async (): PVoid => {
    try {
      const response = await axiosIns.get<IRoomConfig>('/room-config/findByRoomId');
      if (response.status === 200) {
        stores.room.set('config', response.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  saveConfig = async (config: IRoomConfig): PVoid => {
    try {
      console.log(config);
      const response = await axiosIns.post<IRoomConfig>('/room-config/saveConfig', config);
      if (response.status === 200) {
        stores.room.set('config', response.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  setLeaderboard = async (): PVoid => {
    try {
      stores.loading.set('leaderboard', true);
      const response = await axiosIns.get<IPage<IRoomLeaderboard[]>>(
        `/room-session/getLeaderBoard/${stores.room.streamerId}?page=0&size=11`,
      );
      stores.room.set('leaderboard', response.data.content);
    } catch (e: any) {
      console.log(e);
    } finally {
      stores.loading.set('leaderboard', false);
    }
  };
}

const room = new RoomApi();
export default room;
