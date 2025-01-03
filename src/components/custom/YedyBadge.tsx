import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import YedyText from './YedyText';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/util';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number | string;
  defaultBadge?: boolean;
  scale?: number;
};
export default observer(({style, textStyle, badge, defaultBadge, scale}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 1400,
          backgroundColor: colors.tertiary,
          display: badge || defaultBadge ? undefined : 'none',
          padding: defaultBadge ? responsiveWidth(scale ? scale * 10 : 5) : responsiveWidth(4),
          paddingHorizontal: defaultBadge ? undefined : responsiveWidth(4),
          borderRadius: 100,
          borderWidth: responsiveWidth(2),
          borderColor: colors.background,
          right: defaultBadge ? 0 : responsiveWidth(-8),
          top: defaultBadge ? 0 : responsiveWidth(-8),
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {!defaultBadge && badge && (
        <YedyText
          numberOfLines={1}
          type={'bold'}
          size={scale ? scale * 18 : 11}
          color={colors.light}
          style={[textStyle]}
        >
          {typeof badge === 'number' ? api.helper.nummer(badge) : badge}
        </YedyText>
      )}
    </View>
  );
});
