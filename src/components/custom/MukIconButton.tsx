import {IconButton, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, ViewStyle} from 'react-native';
import {ReactNode} from 'react';
import MukBadge from './MukBadge';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  color?: string;
  scale?: number;
  badge?: number;
  onPress?: () => void;
  tooltip?: (props: TooltipScreenProps) => ReactNode;
  disabled?: boolean;
};
export default function MukIconButton({style, icon, color, scale, badge, onPress, tooltip, disabled}: Props) {
  const {colors} = useTheme();

  return (
    <>
      {tooltip}
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          top: responsiveWidth(24),
          right: responsiveWidth(12),
          flex: 1,
          flexDirection: 'row',
        }}
      />
      <IconButton
        disabled={disabled}
        icon={icon ? icon : 'blank'}
        iconColor={color ? color : colors.secondary}
        style={[{margin: 0}, style]}
        size={responsiveSize(scale ? 64 * scale : 64)}
        onPress={onPress}
      />
    </>
  );
}
