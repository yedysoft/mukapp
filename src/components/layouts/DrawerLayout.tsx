import useTheme from '../../hooks/useTheme';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/util';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children?: ReactNode;
};

export default ({children}: Props) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: responsiveWidth(8),
        paddingTop: responsiveWidth(16) + (Platform.OS === 'ios' ? 0 : insets.top),
        paddingBottom: insets.bottom + (Platform.OS === 'ios' ? 0 : responsiveWidth(16)),
      }}
    >
      {children}
    </View>
  );
};
