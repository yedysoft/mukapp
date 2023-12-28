import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import Token from '../user/Token';
import MukIconButton from '../custom/MukIconButton';
import Coin from '../user/Coin';
import {MukTheme} from '../../types';

export default function TokenExchange() {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.backdrop,
        borderRadius: 16,
        paddingHorizontal: responsiveWidth(32),
      }}
    >
      <Token style={{width: '30%', justifyContent: 'flex-start'}} />
      <MukIconButton scale={1} style={{}} icon={'refresh-cw'} onPress={() => console.log('convert')} />
      <Coin style={{width: '30%', justifyContent: 'flex-end'}} />
    </View>
  );
}
