import {Badge, IconButton, Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, View, ViewStyle} from 'react-native';
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
export default function MukIconButton({style, icon, color, scale, badge, onPress, tooltip}: Props) {
  const {colors} = useTheme();

  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: responsiveWidth(24),
          right: responsiveWidth(12),
          flex: 1,
          flexDirection: 'row',
          backgroundColor: colors.tertiary,
          display: badge ? 'flex' : 'none',
          paddingHorizontal: responsiveWidth(8),
          paddingVertical: responsiveWidth(3),
          borderRadius: 100,
          zIndex: 1400
        }}
      >
        <Text numberOfLines={1} style={{
          color: colors.secondary,
          fontWeight: 'bold',
          fontSize: responsiveSize(14),
        }}>
          1
        </Text>
      </View>
      <IconButton
        icon={icon ? icon : 'blank'}
        iconColor={color ? color : colors.secondary}
        style={[{margin: 0}, style]}
        size={responsiveSize(scale ? 64 * scale : 64)}
        onPress={onPress}
      />
    </>
  );
}
