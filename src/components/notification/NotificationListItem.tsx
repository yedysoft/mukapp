import {useTheme} from '../../hooks';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {YedyIcon, YedyIconButton, YedyListItem, YedyText} from '../custom';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {INotification} from '../../types/user';
import {useServices} from '../../services';
import {View} from 'react-native';

type Props = {
  notification: INotification;
  compact: boolean;
};

export default function NotificationListItem({notification, compact}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {api} = useServices();

  return (
    <YedyListItem
      animation={false}
      style={{
        flexDirection: compact ? 'column' : 'row',
        gap: responsiveWidth(8),
        paddingVertical: responsiveHeight(4),
        paddingHorizontal: responsiveWidth(compact ? 8 : 16),
      }}
      disabled={!compact}
      onPress={compact ? () => navigation.navigate('Notifications') : undefined}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: responsiveWidth(8),
          alignItems: 'center',
          flex: 1,
        }}
      >
        <YedyIcon
          scale={compact ? 0.4 : 0.5}
          icon={
            notification.category === 'FOLLOW'
              ? 'account'
              : notification.category === 'MESSAGE'
              ? 'chat-outline'
              : 'information'
          }
        />
        <YedyText numberOfLines={2} size={compact ? 12.5 : 14} style={{flex: 1}}>
          {notification.content}
        </YedyText>
      </View>
      <View
        style={{
          flexDirection: compact ? 'row-reverse' : 'row',
          display: notification.category === 'FOLLOW' ? undefined : 'none',
          gap: responsiveWidth(8),
        }}
      >
        <YedyIconButton
          style={{
            flex: compact ? 1 : undefined,
            backgroundColor: compact ? colors.primary : colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
          color={compact ? colors.dark : colors.primary}
          scale={compact ? 0.25 : 0.35}
          icon={'check-bold'}
          onPress={() => notification && api.user.acceptFollowRequest(notification.data.value, notification.id)}
        />
        <YedyIconButton
          style={{
            flex: compact ? 1 : undefined,
            backgroundColor: compact ? colors.tertiary : colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
          color={compact ? colors.dark : colors.tertiary}
          scale={compact ? 0.25 : 0.35}
          icon={'close-thick'}
          onPress={() => notification && api.user.rejectFollowRequest(notification.data.value, notification.id)}
        />
      </View>
    </YedyListItem>
  );
}
