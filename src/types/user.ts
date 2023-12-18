import {IGender} from './enums';

export type IInfo = {
  id: string | null;
  userName: string;
  image: string;
  name: string;
  surname: string;
  coin: number;
  token: number;
  birthday: string | null;
  gender: IGender | null;
};

export type IFollowUser = {
  userName: string;
  imagePath: string;
  name: string;
  surname: string;
  id: string;
  selected?: boolean;
};

export type IFollowRequest = {
  requestId: string;
  userName: string;
};

export type IBlockedUser = {
  blockId: string;
  blockedUserId: string;
  userName: string;
  imgPath: string;
};

export type ISearchUser = {
  id: string;
  image: string;
  name: string;
  surname: string;
  userName: string;
  isFollower: boolean;
  isFollows: boolean;
};
