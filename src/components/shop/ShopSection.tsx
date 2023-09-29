import {Text, useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveSize, responsiveWidth, screenWidth} from '../../utils/Responsive';

type Props = {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ShopSection({title, children, style}: Props) {
  const {colors} = useTheme();

  return (
    <View style={[{flexDirection: 'column', width: screenWidth, paddingHorizontal: responsiveWidth(20)}, style]}>
      <Text
        style={{
          fontSize: responsiveSize(24),
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
