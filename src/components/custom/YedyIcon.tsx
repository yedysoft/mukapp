import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {responsiveScale} from '../../utils/util';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import YedyBadge from './YedyBadge';
import {useTheme} from '../../hooks';
import {YedyIconName} from '../../types';

type Props = {
  badge?: number | string;
  defaultBadge?: boolean;
  icon: YedyIconName;
  color?: string;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  scale: number;
  directionH?: 'ltr' | 'rtl';
  directionV?: 'ttb' | 'btt';
};

export default ({
  badge,
  defaultBadge,
  icon,
  color,
  style,
  iconStyle,
  scale,
  directionH = 'ltr',
  directionV = 'ttb',
}: Props) => {
  const {colors} = useTheme();
  const rotationH = directionH === 'rtl' ? {scaleX: -1} : undefined;
  const rotationV = directionV === 'btt' ? {scaleY: -1} : undefined;

  const transformStyles = [];
  if (rotationH) {
    transformStyles.push(rotationH);
  }
  if (rotationV) {
    transformStyles.push(rotationV);
  }

  return (
    <View style={style}>
      {(badge || defaultBadge) && <YedyBadge defaultBadge={defaultBadge} badge={badge} scale={scale} />}
      <MaterialCommunityIcons
        color={color ?? colors.secondary}
        size={responsiveScale(scale)}
        style={[{transform: transformStyles}, iconStyle]}
        name={icon}
      />
    </View>
  );
};
