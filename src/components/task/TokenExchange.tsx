import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import Token from '../user/Token';
import {YedyIconButton} from '../custom';
import Coin from '../user/Coin';

export default function TokenExchange() {
  const {colors} = useTheme();

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
      <YedyIconButton scale={1} icon={'account-convert-outline'} onPress={() => console.log('convert')} />
      <Coin style={{width: '30%', justifyContent: 'flex-end'}} />
    </View>
  );
}
