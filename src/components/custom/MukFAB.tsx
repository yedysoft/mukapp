import {FAB, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';

type Props = {
  onPress?: () => void;
};

export default function MukFAB({onPress}: Props) {
  const {colors} = useTheme();

  return (
    <FAB
      icon="plus"
      color={colors.background}
      customSize={responsiveSize(64)}
      style={{position: 'absolute', backgroundColor: colors.primary, bottom: responsiveWidth(16), right: responsiveWidth(16), borderRadius: 100, zIndex: 1400}}
      onPress={onPress}
    />
  );
}
