import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {View} from 'react-native';
import MukIconButton from '../custom/MukIconButton';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {IFollowRequest} from '../../types/user';
import {useServices} from '../../services';

type Props = {
  icon?: IconSource,
  notification?: IFollowRequest,
  buttons?: boolean
}

export default function NotificationsListItem({icon, notification, buttons}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();

  const acceptFollowRequest = async (id: string) => {
    await api.user.acceptFollowRequest(id);
  };

  const rejectFollowRequest = async (id: string) => {
    await api.user.rejectFollowRequest(id);
  };

  return (
    <MukListItem disabled={true} style={{backgroundColor: colors.backdrop, borderRadius: 16, alignItems: 'center'}}>
      <MukIcon scale={.8} icon={icon ?? 'bell-badge-outline'}/>
      <Text style={{fontSize: responsiveSize(14), color: colors.secondary, fontWeight: '400', width: buttons ? responsiveWidth(180) : '80%'}}>{notification?.userName} seni takip etmek istiyor</Text>
      <View style={{flexDirection: 'row', display: buttons ? 'flex' : 'none'}}>
        <MukIconButton color={colors.primary} scale={.5} icon={'check-circle-outline'} onPress={() => notification && acceptFollowRequest(notification?.requestId)}/>
        <MukIconButton color={colors.tertiary} scale={.5} icon={'close-circle-outline'} onPress={() => notification && rejectFollowRequest(notification?.requestId)}/>
      </View>
    </MukListItem>
  );
}
