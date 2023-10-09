import {StyleProp, View, ViewStyle} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Token = observer(({style}: Props) => {
  const {colors} = useTheme();
  const {user} = useStores();
  const {api} = useServices();

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <MukImage
        scale={0.46}
        style={{marginLeft: responsiveWidth(-5), marginRight: responsiveWidth(4)}}
        source={require('../../../assets/coin.png')}
      />
      <Text
        numberOfLines={1}
        style={{color: colors.secondary, fontSize: responsiveSize(18), fontWeight: '600', textAlign: 'left'}}
      >
        {api.helper.nummer(user.getInfo.token)}
      </Text>
    </View>
  );
});

export default Token;
