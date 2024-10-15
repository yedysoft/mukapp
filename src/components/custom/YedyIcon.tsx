import {StyleProp, TextStyle} from 'react-native';
import {responsiveScale} from '../../utils/util';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MukBadge from './YedyBadge';
import useTheme from '../../hooks/useTheme';
import {YedyIconName} from '../../types';

type Props = {
  badge?: number;
  defaultBadge?: boolean;
  icon: YedyIconName;
  color?: string;
  style?: StyleProp<TextStyle>;
  scale?: number;
  direction?: 'ltr' | 'rtl';
};

export default ({badge, defaultBadge, icon, color, style, scale, direction = 'ltr'}: Props) => {
  const {colors} = useTheme();
  const rotation = direction === 'rtl' ? [{scaleX: -1}] : [];

  return (
    <>
      {(badge || defaultBadge) && <MukBadge defaultBadge={defaultBadge} badge={badge} />}
      <MaterialCommunityIcons
        color={color ?? colors.secondary}
        size={responsiveScale(scale)}
        style={[{transform: rotation}, style]}
        name={icon}
      />
    </>
  );
};
