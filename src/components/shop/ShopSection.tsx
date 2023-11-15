import {Text, useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth, screenWidth} from '../../utils/Responsive';
import {MukTheme} from '../../types';

type Props = {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ShopSection({title, children, style}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <View style={[{flexDirection: 'column', width: screenWidth, gap: responsiveHeight(4)}, style]}>
      <Text
        style={{
          fontSize: responsiveSize(20),
          color: colors.secondary,
          fontWeight: '500',
          paddingLeft: responsiveWidth(20),
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
