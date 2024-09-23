import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {useServices} from '../../services';

type Props = {
  style?: StyleProp<ViewStyle>;
  textColor?: string;
};

const Coin = observer(({style, textColor}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {user} = useStores();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <MukImage
        scale={0.32}
        style={{marginRight: responsiveWidth(8)}}
        source={require('../../../assets/wallet/coin.png')}
      />
      <Text
        numberOfLines={1}
        style={{
          color: textColor ?? colors.secondary,
          fontSize: responsiveSize(18),
          fontWeight: '600',
          textAlign: 'left',
        }}
      >
        {api.helper.nummer(user.getInfo.coin)}
      </Text>
    </View>
  );
});

export default Coin;
