import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

type Props = {
  style?: StyleProp<ViewStyle>;
  customValue?: string;
};

const Token = observer(({style, customValue}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <MukImage
        scale={0.32}
        style={{marginRight: responsiveWidth(8)}}
        source={require('../../../assets/wallet/token.png')}
      />
      <Text
        numberOfLines={1}
        style={{color: colors.secondary, fontSize: responsiveSize(18), fontWeight: '600', textAlign: 'left'}}
      >
        {customValue ?? user.getInfo.token}
      </Text>
    </View>
  );
});

export default Token;
