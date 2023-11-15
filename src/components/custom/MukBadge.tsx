import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleProp, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';

type Props = {
  style?: StyleProp<ViewStyle>;
  badge?: number;
};
export default function MukBadge({style, badge}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={[
        {
          backgroundColor: colors.secondary,
          minWidth: responsiveWidth(16),
          display: badge ? 'flex' : 'none',
          paddingHorizontal: responsiveWidth(8),
          paddingVertical: responsiveWidth(3),
          borderRadius: 100,
          zIndex: 1400,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={{
          color: colors.tertiary,
          fontWeight: 'bold',
          fontSize: responsiveSize(14),
        }}
      >
        {badge}
      </Text>
    </View>
  );
}
