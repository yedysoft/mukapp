import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIconButton from '../custom/MukIconButton';
import {observer} from 'mobx-react';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: ISearchUser;
};

const ProfileListItem = observer(({item}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} onPress={() => navigation.navigate('Profile', {id: item.userId})}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage scale={1} source={require('../../../assets/adaptive-icon.png')}/>
        <View style={{justifyContent: 'center', gap: responsiveWidth(8)}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400'}}>
            @{item.userName}
          </Text>
        </View>
      </View>
      <MukIconButton
        scale={0.4}
        icon={'cancel'}
        color={'rgba(255, 55, 95, 1)'}
        onPress={() => console.log('block')}
      />
    </MukListItem>
  );
});

export default ProfileListItem;
