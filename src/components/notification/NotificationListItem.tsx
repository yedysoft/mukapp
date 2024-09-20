import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {INotification} from '../../types/user';
import {useServices} from '../../services';
import MukIconButton from '../custom/MukIconButton';
import {View} from 'react-native';
import MukIcon from '../custom/MukIcon';

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
        <Text
          numberOfLines={2}
          style={{
            color: colors.secondary,
            fontSize: responsiveSize(compact ? 14 : 16),
            maxWidth: compact ? '70%' : '100%',
          }}
        >
          {notification.content}
        </Text>
      </View>
      <View
        style={{
          width: compact ? '100%' : undefined,
          justifyContent: 'space-between',
          flexDirection: compact ? 'row-reverse' : 'row',
          display: notification.category === 'FOLLOW' ? undefined : 'none',
        }}
      >
        <MukIconButton
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
          onPress={() => notification && api.user.acceptFollowRequest(notification.data, notification.id)}
        />
        <MukIconButton
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
          onPress={() => notification && api.user.rejectFollowRequest(notification.data, notification.id)}
        />
      </View>
    </MukListItem>
  );
}
