import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {INotification} from '../../types/user';
import {useServices} from '../../services';
import YedyIconButton from '../custom/YedyIconButton';
import {View} from 'react-native';
import MukIcon from '../custom/MukIcon';
import YedyText from '../custom/YedyText';

type Props = {
  notification: INotification;
  compact: boolean;
};

export default function NotificationListItem({notification, compact}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();

  return (
    <MukListItem
      style={{
        flexDirection: compact ? 'column' : 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        gap: compact ? responsiveWidth(8) : 0,
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(16),
      }}
      onPress={() => navigation.navigate('Notifications')}
    >
      <View
        style={{
          flexDirection: 'row',
          width: compact ? '100%' : '64%',
          gap: responsiveWidth(8),
          alignItems: 'center',
        }}
      >
        <MukIcon
          scale={compact ? 0.5 : 0.6}
          icon={
            notification.category === 'FOLLOW'
              ? 'user-plus'
              : notification.category === 'MESSAGE'
              ? 'message-circle'
              : 'info'
          }
        />
        <YedyText numberOfLines={2} fontSize={compact ? 14 : 16} style={{maxWidth: compact ? '70%' : '100%'}}>
          {notification.content}
        </YedyText>
      </View>
      <View
        style={{
          width: compact ? '100%' : undefined,
          justifyContent: 'space-between',
          flexDirection: compact ? 'row-reverse' : 'row',
          display: notification.category === 'FOLLOW' ? undefined : 'none',
        }}
      >
        <YedyIconButton
          style={{
            backgroundColor: compact ? colors.primary : colors.background,
            width: compact ? '48%' : undefined,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
          color={compact ? colors.secondary : colors.primary}
          scale={compact ? 0.3 : 0.4}
          icon={'check-circle'}
          onPress={() => notification && api.user.acceptFollowRequest(notification.data.value, notification.id)}
        />
        <YedyIconButton
          style={{
            backgroundColor: compact ? colors.tertiary : colors.background,
            width: compact ? '48%' : undefined,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
          color={compact ? colors.secondary : colors.tertiary}
          scale={compact ? 0.3 : 0.4}
          icon={'x-circle'}
          onPress={() => notification && api.user.rejectFollowRequest(notification.data.value, notification.id)}
        />
      </View>
    </MukListItem>
  );
}
