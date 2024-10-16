import {responsiveWidth} from '../../utils/util';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import YedyText from './YedyText';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number;
  defaultBadge?: boolean;
};
export default observer(({style, textStyle, badge, defaultBadge}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          position: 'absolute',
          backgroundColor: colors.tertiary,
          display: badge || defaultBadge ? undefined : 'none',
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveWidth(2),
          borderRadius: 100,
          right: responsiveWidth(4),
          zIndex: 1400,
        },
        style,
      ]}
    >
      {!defaultBadge && (
        <YedyText numberOfLines={1} type={'bold'} size={14} color={colors.light} style={textStyle}>
          {badge}
        </YedyText>
      )}
    </View>
  );
});
