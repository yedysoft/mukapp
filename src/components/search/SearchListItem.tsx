import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {View} from 'react-native';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';

type Props = {
  user?: ISearchUser
}

export default function SearchListItem({user}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();
  const navigation = useNavigation();

  const sendFollowRequest = async (id: string) => {
    await api.user.sendFollowRequest(id);
  };

  return (
    <MukListItem style={{backgroundColor: colors.backdrop, borderRadius: 16, alignItems: 'center'}} onPress={() => navigation.navigate('Profile', user)}>
      <MukIcon scale={.8} icon={user?.image ?? 'account'}/>
      <View style={{flexDirection: 'column', width: '66%', gap: responsiveWidth(4)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(15), color: colors.secondary, fontWeight: '600'}}>{user?.name} {user?.surname}</Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), color: colors.outline, fontWeight: '400'}}>@{user?.userName}</Text>
      </View>
      <MukIconButton color={colors.secondary} scale={.4} icon={'account-plus-outline'} onPress={() => user && sendFollowRequest(user?.id)}/>
    </MukListItem>
  );
}
