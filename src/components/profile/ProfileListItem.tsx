import {Text} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIconButton from '../custom/MukIconButton';
import {observer} from 'mobx-react';

type Props = {
  item: null;
};

const ProfileListItem = observer(({item}: Props) => {
  return (
    <MukListItem style={{alignItems: 'center'}} disabled={true}>
      <MukImage scale={1.3} source={require('../../../assets/adaptive-icon.png')}/>
      <View style={{justifyContent: 'center', gap: responsiveWidth(8)}}>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(18), fontWeight: '400'}}>
          Item Name
        </Text>
        <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
          Item Desc
        </Text>
      </View>
      <MukIconButton
        style={{position: 'absolute', right: responsiveWidth(16)}}
        scale={0.4}
        icon={'cards-heart-outline'}
        color={'rgba(255, 55, 95, 1)'}
        onPress={() => console.log('profiler')}
      />
    </MukListItem>
  );
});

export default ProfileListItem;
