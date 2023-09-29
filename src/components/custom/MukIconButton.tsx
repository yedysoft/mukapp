import {Badge, IconButton} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, ViewStyle} from 'react-native';
import {ReactNode} from 'react';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  color?: string;
  scale?: number;
  badge?: number;
  onPress?: () => void;
  tooltip?: (props: TooltipScreenProps) => ReactNode;
};
export default function MukIconButton({style, icon, color, scale, badge, onPress}: Props) {
  return (
    <>
      {badge && (
        <Badge
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'white',
            width: responsiveWidth(16),
            fontWeight: 'bold',
            aspectRatio: 1,
            zIndex: 1400,
          }}
        >
          {badge}
        </Badge>
      )}
      <IconButton
        icon={icon ? icon : 'blank'}
        iconColor={color ? color : 'white'}
        style={[{margin: 0}, style]}
        size={responsiveSize(scale ? 64 * scale : 64)}
        onPress={onPress}
      />
    </>
  );
}
