import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import MukImage from '../custom/MukImage';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {INotification} from '../../types/user';

type Props = {
  notification: INotification;
};

export default function NotificationListItem({notification}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <MukListItem
      style={{
        backgroundColor: 'transparent',
        gap: responsiveWidth(8),
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(16),
      }}
      onPress={() => navigation.navigate('Notifications')}
    >
      <MukImage
        scale={0.6}
        source={require('../../../assets/adaptive-icon.png')}
        style={{backgroundColor: colors.background, borderWidth: 0.2, borderRadius: 100, borderColor: colors.secondary}}
      />
      <Text numberOfLines={2} style={{color: colors.secondary, maxWidth: responsiveWidth(124)}}>
        {notification.content}
      </Text>
    </MukListItem>
  );
}
