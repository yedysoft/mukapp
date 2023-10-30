import {Pressable, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {IInfo, ISearchUser} from '../../types/user';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';

type Props = {
  user: IInfo | ISearchUser;
  onPress: () => void;
}

export default function VerticalProfile({user, onPress}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();

  const sendFollowRequest = async (id: string) => {
    await api.user.sendFollowRequest(id);
  };

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(16)}}>
      <Pressable onPress={onPress}>
        <MukImage
          scale={2.4}
          source={{uri: user.image}}
          style={{
            borderWidth: responsiveSize(4),
            borderRadius: 100,
            aspectRatio: 1,
            borderColor: colors.primary,
            backgroundColor: 'transparent',
          }}
        />
      </Pressable>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(8)}}>
        <Text style={{fontSize: responsiveSize(24), fontWeight: 'bold'}}>{user.name} {user.surname}</Text>
        <Text style={{fontSize: responsiveSize(16), fontWeight: '500', color: colors.onSurfaceVariant}}>@{user.userName}</Text>
        <View style={{flexDirection: 'row'}}>
          <MukIconButton color={colors.secondary} scale={.4} icon={'account-plus-outline'} onPress={() => user && sendFollowRequest(user.id)}/>
          <MukIconButton scale={0.4} icon={'cancel'} color={'rgba(255, 55, 95, 1)'} onPress={() => console.log('block')}/>
        </View>
      </View>
    </View>
  );
}
