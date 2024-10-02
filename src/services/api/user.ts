import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {IPage, MessageBody, PVoid} from '../../types';
import media from './media';
import {IQueueTrack} from '../../types/media';
import {IBlockedUser, IFollowUser, IInfo, INotification, ISearchUser} from '../../types/user';
import {IEdit, IPassChange} from '../../types/auth';

class UserApi {
  getInfo = async (): PVoid => {
    try {
      const response = await axiosIns.get<IInfo>('/user-info/getInfo');
      stores.user.set('info', response.data);
    } catch (e) {
      console.log(e);
    }
  };

  addCoin = async (quantity: number): PVoid => {
    try {
      await axiosIns.get(`/test/addCoin/${stores.user.getInfo.id}/${quantity}`);
    } catch (e) {
      console.log(e);
    }
  };

  searchUser = async (keyword: string, page = 0, size = 10): PVoid => {
    try {
      const response = await axiosIns.get<IPage<ISearchUser[]>>(
        `/user-info/search/${keyword}?page=${page}&size=${size}&sort=ui.name`,
      );
      if (response.status === 200) {
        stores.user.set('searched', response.data.content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getFollows = async (userId: string): PVoid => {
    try {
      stores.loading.set('following', true);
      const response = await axiosIns.get<IFollowUser[]>(`/user-follower/getFollows/${userId}`);
      if (response.status === 200) {
        stores.user.set('follows', response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('following', false);
    }
  };

  getFollowers = async (userId: string): PVoid => {
    try {
      stores.loading.set('followers', true);
      const response = await axiosIns.get<IFollowUser[]>(`/user-follower/getFollowers/${userId}`);
      if (response.status === 200) {
        stores.user.set('followers', response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('followers', false);
    }
  };

  sendFollowRequest = async (userId: string): PVoid => {
    try {
      await axiosIns.get(`/follow-request/${userId}`);
    } catch (e) {
      console.log(e);
    }
  };

  acceptFollowRequest = async (requestId: any, notificationId?: string): PVoid => {
    try {
      console.log(requestId);
      const response = await axiosIns.get(`/follow-request/accept/${requestId}`);
      if (response.status === 200) {
        notificationId && (await this.deleteNotification(notificationId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  rejectFollowRequest = async (requestId: string, notificationId?: string): PVoid => {
    try {
      const response = await axiosIns.delete(`/follow-request/reject/${requestId}`);
      if (response.status === 200) {
        notificationId && (await this.deleteNotification(notificationId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  blockUser = async (userId: string): PVoid => {
    try {
      const response = await axiosIns.get(`/user-blocked/block/${userId}`);
      if (response.status === 200) {
        await this.getBlockedUsers();
        console.log('Block: ', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  unblockUser = async (blockId: string | undefined): PVoid => {
    try {
      const response = await axiosIns.get(`/user-blocked/unblock/${blockId}`);
      if (response.status === 200) {
        await this.getBlockedUsers();
        console.log('Unblock: ', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getBlockedUsers = async (): PVoid => {
    try {
      const response = await axiosIns.get<IBlockedUser[]>('/user-blocked/getBlockedUsers');
      if (response.status === 200) {
        stores.user.set('blockedUsers', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  unFollow = async (userId: string): PVoid => {
    try {
      const response = await axiosIns.delete(`/user-follower/unFollow/${userId}`);
      if (response.status === 200) {
        await this.getFollows(stores.user.getInfo.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  takeOutMyFollowers = async (userId: string): PVoid => {
    try {
      const response = await axiosIns.delete(`/user-follower/takeOutMyFollowers/${userId}`);
      if (response.status === 200) {
        await this.getFollowers(stores.user.getInfo.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTopListVoteMusic = async (userId: string | null): PVoid => {
    const topListVoteMusic: {topVoted: IQueueTrack[]; countTopVoted: number} = {topVoted: [], countTopVoted: 0};
    try {
      stores.loading.set('votes', true);
      const response = await axiosIns.get(`/vote/getTopListVoteMusic/${userId}`);
      topListVoteMusic.topVoted = media.getQueueTracks(response.data.map((d: any, _: number) => d));
      topListVoteMusic.countTopVoted = response.data
        .map((d: any, _: number) => d.total)
        .reduce((sum: number, num: number) => sum + num, 0);
    } catch (e) {
      console.log(e);
    } finally {
      stores.user.setMany({topVoted: topListVoteMusic.topVoted, countTopVoted: topListVoteMusic.countTopVoted});
      stores.loading.set('votes', false);
    }
  };

  getAllNotifications = async (): PVoid => {
    try {
      const response = await axiosIns.get<INotification[]>('/notification/getAllNotifications');
      if (response.status === 200) {
        stores.user.set('notifications', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  deleteNotification = async (notificationId: string): PVoid => {
    try {
      const response = await axiosIns.delete(`/notification/deleteNotification/${notificationId}`);
      if (response.status === 200) {
        stores.user.set('notifications', v => v.filter(n => n.id !== notificationId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  updateReaded = async (): PVoid => {
    try {
      const unreaded = stores.user.getNotifications.filter(n => !n.readed);
      if (unreaded.length > 0) {
        const response = await axiosIns.post(
          '/notification/updateReaded',
          unreaded.map(n => n.id),
        );
        if (response.status === 200) {
          stores.user.set(
            'notifications',
            stores.user.getNotifications.map(n => ({
              ...n,
              readed: true,
            })),
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  passChange = async (form: IPassChange): PVoid => {
    try {
      stores.loading.set('passChange', true);
      await axiosIns.post<MessageBody>('/user/passChange', form);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('passChange', false);
    }
  };

  async editInfo(info: IEdit): PVoid {
    try {
      stores.loading.set('editInfo', true);
      const response = await axiosIns.post<IInfo>('/user-info/editInfo', info);
      if (response.status === 200) {
        console.log(response.data);
        stores.user.set('info', response.data);
        stores.ui.addInfo('Kayıt başarılı.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('editInfo', false);
    }
  }
}

const user = new UserApi();
export default user;
