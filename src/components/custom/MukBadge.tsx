import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number;
};
export default observer(({style, textStyle, badge}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

  return (
    <View
      style={[
        {
          backgroundColor: ui.getScheme === 'light' ? colors.tertiary : colors.secondary,
          minWidth: responsiveWidth(16),
          display: badge ? 'flex' : 'none',
          paddingHorizontal: responsiveWidth(8),
          paddingVertical: responsiveWidth(3),
          borderRadius: 100,
          zIndex: 1400,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          {
            color: ui.getScheme === 'light' ? colors.background : colors.tertiary,
            fontWeight: 'bold',
            fontSize: responsiveSize(14),
          },
          textStyle,
        ]}
      >
        {badge}
      </Text>
    </View>
  );
});
