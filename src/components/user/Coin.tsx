import {StyleProp, View, ViewStyle} from 'react-native';
import {YedyImage, YedyText} from '../custom';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';

type Props = {
  style?: StyleProp<ViewStyle>;
  textColor?: string;
};

const Coin = observer(({style, textColor}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4)}, style]}>
      <YedyImage scale={0.32} source={require('../../../assets/wallet/coin.png')} />
      <View>
        <YedyText numberOfLines={1} type={'bold'} size={18} color={textColor ?? colors.secondary}>
          {api.helper.nummer(user.getInfo.coin)}
        </YedyText>
      </View>
    </View>
  );
});

export default Coin;
