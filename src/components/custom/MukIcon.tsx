import {Avatar, Badge, useTheme} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';
import {responsiveScale, responsiveWidth} from '../../utils/util';
import {MukTheme} from 'src/types';

type Props = {
  badge?: number;
  icon: any;
  color?: string;
  iconStyle?: StyleProp<ViewStyle>;
  scale?: number;
  direction?: 'ltr' | 'rtl' | 'auto';
};

export default function MukIcon({badge, icon, color, iconStyle, scale, direction = 'auto'}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <>
      {badge && (
        <Badge
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: colors.secondary,
            width: responsiveWidth(16),
            fontWeight: 'bold',
            aspectRatio: 1,
            zIndex: 1400,
          }}
        >
          {badge}
        </Badge>
      )}
      <Avatar.Icon
        icon={{source: icon, direction: direction}}
        color={color ? color : colors.secondary}
        size={responsiveScale(scale)}
        style={[{backgroundColor: 'transparent', marginLeft: responsiveWidth(-5)}, iconStyle]}
      />
    </>
  );
}
