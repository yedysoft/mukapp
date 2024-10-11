import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import YedyText from '../custom/YedyText';
import {useServices} from '../../services';

type Props = {
  style?: StyleProp<ViewStyle>;
  customValue?: number;
};

const Token = observer(({style, customValue}: Props) => {
  const {user} = useStores();
  const {api} = useServices();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4)}, style]}>
      <MukImage scale={0.32} source={require('../../../assets/wallet/token.png')} />
      <View style={{flex: 1}}>
        <YedyText numberOfLines={1} fontType={'bold'} fontSize={18}>
          {api.helper.nummer(customValue ?? user.getInfo.token)}
        </YedyText>
      </View>
    </View>
  );
});

export default Token;
