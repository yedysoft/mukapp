import {Text, useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';

type Props = {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default observer(({title, children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <View style={[{flex: 1, flexDirection: 'column', gap: responsiveWidth(4)}, style]}>
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
