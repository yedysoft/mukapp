import {ProgressBar, useTheme} from 'react-native-paper';
import {responsiveHeight} from '../../utils/Responsive';
import {StyleProp, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';

type Props = {
  progress?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function MukProgressBar({progress, color, style}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <ProgressBar
      progress={progress}
      color={color}
      style={[{height: responsiveHeight(4), borderRadius: 100, width: '100%', backgroundColor: colors.backdrop}, style]}
    />
  );
}
