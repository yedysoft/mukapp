import {IconButton} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, ViewStyle} from 'react-native';
import {ReactNode} from 'react';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  color?: string;
  scale?: number;
  onPress?: () => void;
  tooltip?: (props: TooltipScreenProps) => ReactNode;
};
export default function MukIconButton({style, icon, color, scale, onPress}: Props) {
  return (
    <IconButton
      icon={icon ? icon : 'blank'}
      iconColor={color ? color : 'white'}
      style={[{margin: 0}, style]}
      size={responsiveSize(scale ? 64 * scale : 64)}
      onPress={onPress}
    />
  );
}
