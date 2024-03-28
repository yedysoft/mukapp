import {IGender, INotificationType} from './enums';

export type IInfo = {
  id: string;
  userName: string;
  imageServerId: string;
  image: string;
  name: string;
  surname: string;
  coin: number;
  token: number;
  birthday: string | null;
  gender: IGender | null;
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
  imagePath: string;
  name: string;
  surname: string;
  selected?: boolean;
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
