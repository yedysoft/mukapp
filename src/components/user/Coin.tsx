import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

const Coin = observer(() => {
  const {user} = useStores();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MukImage scale={0.6} source={require('../../../assets/coin.png')} />
      <Text style={{color: 'white', fontSize: responsiveSize(16)}}>{user.getInfo.coin}</Text>
    </View>
  );
});

export default Coin;
