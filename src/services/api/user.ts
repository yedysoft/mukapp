import axiosIns from '../axiosIns';
import {stores} from '../../stores';

export class UserApi {
  async getInfo(): PVoid {
    try {
      const response = await axiosIns.get('/user-info/getInfo');
      stores.user.set('info', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getInfoById(id: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-info/getInfoById/${id}`);
      stores.user.set('otherUser', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getChats(): PVoid {
    try {
      const response = await axiosIns.get('/message/getChats');
      stores.user.set('chats', response.data);
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
      const response = await axiosIns.get(`/user-info/search/${keyword}?page=${page}&size=${size}&sort=ui.name`);
      stores.user.set('searched', response.data.content);
    } catch (e) {
      console.log(e);
    }
  }

  async getFollows(userId: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-follower/getFollows/${userId}`);
      console.log('Follows: ', response.data)
      stores.user.set('follows', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async getFollowers(userId: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-follower/getFollowers/${userId}`);
      console.log('Followers: ', response.data)
      stores.user.set('followers', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async sendFollowRequest(userId: string): PVoid {
    try {
      const response = await axiosIns.get(`/follow-request/${userId}`);
      console.log('Request: ', response.data)
    } catch (e) {
      console.log(e);
    }
  }

  async getFollowRequests(): PVoid {
    try {
      const response = await axiosIns.get(`/follow-request/getIncomingFollowRequests`);
      console.log('Requests: ', response.data)
      stores.user.set('followRequests', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async acceptFollowRequest(requestId: string): PVoid {
    try {
      const response = await axiosIns.get(`/follow-request/accept/${requestId}`);
      console.log('Accept: ', response.data)
      await this.getFollowRequests()
    } catch (e) {
      console.log(e);
    }
  }

  async rejectFollowRequest(requestId: string): PVoid {
    try {
      const response = await axiosIns.delete(`/follow-request/reject/${requestId}`);
      console.log('Reject: ', response.data)
      await this.getFollowRequests()
    } catch (e) {
      console.log(e);
    }
  }

  async blockUser(userId: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-blocked/block/${userId}`);
      console.log('Block: ', response.data)
    } catch (e) {
      console.log(e);
    }
  }

  async unblockUser(blockId: string): PVoid {
    try {
      const response = await axiosIns.get(`/user-blocked/unblock/${blockId}`);
      console.log('Unblock: ', response.data)
    } catch (e) {
      console.log(e);
    }
  }

  async getBlockedUsers(): PVoid {
    try {
      const response = await axiosIns.get(`/user-blocked/getBlockedUsers`);
      console.log('BlockedUsers: ', response.data)
      stores.user.set('blockedUsers', response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

const user = new UserApi();
export default user;
