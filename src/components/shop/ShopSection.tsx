import {Text, useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

type Props = {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default observer(({title, children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

  return (
    <View style={[{flexDirection: 'column', width: ui.windowWidth, gap: responsiveHeight(4)}, style]}>
      <Text
        style={{
          fontSize: responsiveSize(24),
          color: colors.secondary,
          fontWeight: '400',
          paddingLeft: responsiveWidth(20),
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
});
