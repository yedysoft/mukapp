import axiosIns from '../axiosIns';
import {stores} from '../../stores';
import {IPage, PVoid} from '../../types';
import media from './media';
import {IQueueTrack} from '../../types/media';
import {IBlockedUser, IFollowUser, IInfo, INotification, ISearchUser} from '../../types/user';

class UserApi {
  async getInfo(): PVoid {
    try {
      const response = await axiosIns.get<IInfo>('/user-info/getInfo');
      stores.user.set('info', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async addCoin(quantity: number): PVoid {
    try {
      await axiosIns.get(`/test/addCoin/${stores.user.getInfo.id}/${quantity}`);
    } catch (e) {
      console.log(e);
    }
  }

  async searchUser(keyword: string, page = 0, size = 10): PVoid {
    try {
      const response = await axiosIns.get<IPage<ISearchUser[]>>(
        `/user-info/search/${keyword}?page=${page}&size=${size}&sort=ui.name`,
      );
      stores.user.set('searched', response.data.content);
      console.log(response.data.content);
    } catch (e) {
      console.log(e);
    }
  }

  async getFollows(userId: string): PVoid {
    try {
      stores.loading.set('following', true);
      const response = await axiosIns.get<IFollowUser[]>(`/user-follower/getFollows/${userId}`);
      console.log('Follows: ', response.data);
      stores.user.set('follows', response.data);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('following', false);
    }
  }

  async getFollowers(userId: string): PVoid {
    try {
      stores.loading.set('followers', true);
      const response = await axiosIns.get<IFollowUser[]>(`/user-follower/getFollowers/${userId}`);
      console.log('Followers: ', response.data);
      stores.user.set('followers', response.data);
    } catch (e) {
      console.log(e);
    } finally {
      stores.loading.set('followers', false);
    }
  }

  async sendFollowRequest(userId: string): PVoid {
    try {
      await axiosIns.get(`/follow-request/${userId}`);
    } catch (e) {
      console.log(e);
    }
  }

  async acceptFollowRequest(requestId: string, notificationId?: string): PVoid {
    try {
      const response = await axiosIns.get(`/follow-request/accept/${requestId}`);
      if (response.status === 200) {
        notificationId && (await this.deleteNotification(notificationId));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async rejectFollowRequest(requestId: string, notificationId?: string): PVoid {
    try {
      const response = await axiosIns.delete(`/follow-request/reject/${requestId}`);
      if (response.status === 200) {
        notificationId && (await this.deleteNotification(notificationId));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async blockUser(userId: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-blocked/block/${userId}`);
      console.log('Block: ', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async unblockUser(blockId: string | undefined): PVoid {
    try {
      const response = await axiosIns.get(`/user-blocked/unblock/${blockId}`);
      console.log('Unblock: ', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getBlockedUsers(): PVoid {
    try {
      const response = await axiosIns.get<IBlockedUser[]>('/user-blocked/getBlockedUsers');
      console.log('BlockedUsers: ', response.data);
      stores.user.set('blockedUsers', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async unFollow(userId: string): PVoid {
    try {
      const response = await axiosIns.delete(`/user-follower/unFollow/${userId}`);
      console.log('Unfollow: ', response.data);
      await this.getFollows(stores.user.getInfo.id);
    } catch (e) {
      console.log(e);
    }
  }

  async takeOutMyFollowers(userId: string): PVoid {
    try {
      const response = await axiosIns.delete(`/user-follower/takeOutMyFollowers/${userId}`);
      console.log('takeOutMyFollowers: ', response.data);
      await this.getFollowers(stores.user.getInfo.id);
    } catch (e) {
      console.log(e);
    }
  }

  async getTopListVoteMusic(userId: string | null): PVoid {
    const topListVoteMusic: {topVoted: IQueueTrack[]; countTopVoted: number} = {topVoted: [], countTopVoted: 0};
    try {
      stores.loading.set('votes', true);
      const response = await axiosIns.get(`/user-info/getTopListVoteMusic/${userId}`);
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
  }

  async getAllNotifications(): PVoid {
    try {
      const response = await axiosIns.get<INotification[]>('/notification/getAllNotifications');
      if (response.status === 200) {
        stores.user.set('notifications', response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteNotification(notificationId: string): PVoid {
    try {
      const response = await axiosIns.delete(`/notification/deleteNotification/${notificationId}`);
      if (response.status === 200) {
        stores.user.set(
          'notifications',
          stores.user.getNotifications.filter(n => n.id !== notificationId),
        );
      }
      console.log('Delete Notification: ', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async updateReaded(): PVoid {
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
  }
}

const user = new UserApi();
export default user;
