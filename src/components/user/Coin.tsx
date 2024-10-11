import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../custom/MukImage';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {useServices} from '../../services';
import YedyText from '../custom/YedyText';

type Props = {
  style?: StyleProp<ViewStyle>;
  textColor?: string;
};

const Coin = observer(({style, textColor}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4)}, style]}>
      <MukImage scale={0.32} source={require('../../../assets/wallet/coin.png')} />
      <View style={{flex: 1}}>
        <YedyText numberOfLines={1} fontType={'bold'} fontSize={18} style={{color: textColor ?? colors.secondary}}>
          {api.helper.nummer(user.getInfo.coin)}
        </YedyText>
      </View>
    </View>
  );
});

export default Coin;
