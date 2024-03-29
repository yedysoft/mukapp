import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {IChat} from '../../types/chat';
import {FlatList} from 'react-native';
import MessagesListItem from './MessagesListItem';
import {responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';

type Props = {
  chats: IChat[];
};

export default function MessagesList({chats}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <>
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={({item, index}) => <MessagesListItem key={index} chat={item} />}
          scrollEnabled
          contentContainerStyle={{
            paddingVertical: responsiveWidth(8),
            backgroundColor: colors.background,
          }}
        />
      ) : (
        <MukImage
          source={require('../../../assets/noimage-gray.png')}
          scale={2}
          style={{alignSelf: 'center', marginTop: responsiveWidth(16), opacity: 0.1}}
        />
      )}
    </>
  );
}
