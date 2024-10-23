import {IGender, INotificationType} from './enums';

export type IInfo = {
  id: string;
  userName: string;
  image: IImage | null;
  name: string;
  coin: number;
  token: number;
  birthday: string | null;
  gender: IGender | null;
  isFollower: boolean;
  isFollows: boolean;
  chatColor?: string;
};

export type IImage = {
  id: string;
  tempId: string;
  link: string;
  temp1: string;
  nsfw?: boolean;
};

export type INotification = {
  id: string;
  receiverId: string;
  date: string | Date;
  content: string;
  data: any;
  category: INotificationType;
  readed: boolean;
};

export type IFollowUser = {
  id: string;
  userName: string;
  name: string;
  image: IImage | null;
  selected?: boolean;
};

export type IBlockedUser = {
  blockId: string;
  blockedUserId: string;
  userName: string;
  image: IImage | null;
};

export type ISearchUser = {
  id: string;
  userName: string;
  name: string;
  image: IImage | null;
  isFollower: boolean;
  isFollows: boolean;
};
