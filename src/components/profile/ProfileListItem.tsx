import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';

type Props = {
  item: ISearchUser;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
};

const ProfileListItem = observer(({item, onIconPress, otherUser}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {auth} = useStores();

  return (
    <MukListItem
      style={{alignItems: 'center', justifyContent: 'space-between'}}
      onPress={() => {
        console.log('ProfileListItem', {userId: item.id});
        navigation.navigate('Profile', {userId: item.id});
      }}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage
          scale={1}
          source={
            item.image
              ? {uri: `${item.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
        />
        <View style={{justifyContent: 'center', gap: responsiveWidth(4)}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '500', color: colors.secondary}}>
            {item.name} {item.surname}
          </Text>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '300', color: colors.secondary}}>
            @{item.userName}
          </Text>
        </View>
      </View>
      {/*
        <MukIconButton
          scale={0.4}
          icon={'user-minus'}
          color={colors.secondary}
          style={{display: otherUser ? 'none' : 'flex'}}
          onPress={() => onIconPress(item.id)}
        />
      */}
    </MukListItem>
  );
});

export default ProfileListItem;
