import {Pressable, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {IInfo, ISearchUser} from '../../types/user';
import MukIconButton from '../custom/MukIconButton';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import EditImage from '../profile/EditImage';
import {useState} from 'react';

type Props = {
  profile: IInfo | ISearchUser;
}

export default function VerticalProfile({profile}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();

  const [visible, setVisible] = useState(false);

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(16)}}>
      <Pressable onPress={() => setVisible(true)}>
        <MukImage
          scale={2.4}
          source={{uri: profile.image}}
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
        <Text style={{fontSize: responsiveSize(24), fontWeight: 'bold'}}>{profile.name} {profile.surname}</Text>
        <Text style={{fontSize: responsiveSize(16), fontWeight: '500', color: colors.onSurfaceVariant}}>@{profile.userName}</Text>
      </View>
      <EditImage setVisible={setVisible} isVisible={visible}/>
      <View style={{flexDirection: 'row', display: profile.id === user.info.id ? 'none' : 'flex'}}>
        <MukIconButton color={colors.secondary} scale={.4} icon={profile.isFollows ? 'account-minus-outline' : 'account-plus-outline'} onPress={() => profile.isFollows ? api.user.unFollow(profile.id) : api.user.sendFollowRequest(profile.id)}/>
        <MukIconButton scale={0.4} icon={'cancel'} color={'rgba(255, 55, 95, 1)'} onPress={() => api.user.blockUser(profile.id)}/>
      </View>
    </View>
  );
}
