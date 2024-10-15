import {responsiveWidth} from '../../utils/util';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import YedyText from './YedyText';
import useTheme from '../../hooks/useTheme';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number;
  defaultBadge?: boolean;
};
export default observer(({style, textStyle, badge, defaultBadge}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();

  return (
    <View
      style={[
        {
          backgroundColor: ui.getScheme === 'light' ? colors.tertiary : colors.secondary,
          minWidth: responsiveWidth(16),
          display: badge || defaultBadge ? undefined : 'none',
          paddingHorizontal: responsiveWidth(8),
          paddingVertical: responsiveWidth(3),
          borderRadius: 100,
          zIndex: 1400,
        },
        style,
      ]}
    >
      <YedyText
        numberOfLines={1}
        fontType={'bold'}
        fontSize={14}
        style={[{color: ui.getScheme === 'light' ? colors.background : colors.tertiary}, textStyle]}
      >
        {badge}
      </YedyText>
    </View>
  );
});
