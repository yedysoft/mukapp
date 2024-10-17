import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import YedyText from './YedyText';
import {useServices} from '../../services';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number;
  defaultBadge?: boolean;
};
export default observer(({style, textStyle, badge, defaultBadge}: Props) => {
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
          padding: 2,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: colors.background,
          right: defaultBadge ? 0 : -6,
          top: defaultBadge ? 0 : -6,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {!defaultBadge && badge && (
        <YedyText numberOfLines={1} type={'bold'} size={14} color={colors.light} style={[textStyle]}>
          {api.helper.nummer(badge)}
        </YedyText>
      )}
    </View>
  );
});
