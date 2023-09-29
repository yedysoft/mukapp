import {Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {View} from 'react-native';
import MukListItem from '../custom/MukListItem';

type Props = {
  onPress?: () => void;
  chats?: {
    username?: string,
    date?: string,
    message?: string
  }
};

export default function MessagesListItem({onPress, chats}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem onPress={onPress}>
      <MukImage scale={1.3} style={{borderRadius: 100, borderColor: colors.primary, borderWidth: 1}} source={require('../../../assets/adaptive-icon.png')}/>
      <View style={{flex: 1, justifyContent: 'flex-start', gap: responsiveWidth(8), paddingTop: responsiveWidth(8)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '500'}}>
            {chats?.username}
          </Text>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(15), fontWeight: '400', position: 'absolute', right: 0}}>
            {chats?.date}
          </Text>
        </View>
        <Text numberOfLines={2} style={{flex: 1, fontSize: responsiveSize(15), fontWeight: '400'}}>
          {chats?.message}
        </Text>
      </View>
    </MukListItem>
  );
}
