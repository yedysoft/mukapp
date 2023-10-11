import {ProgressBar, useTheme} from 'react-native-paper';
import {responsiveHeight} from '../../utils/Responsive';

type Props = {
  progress?: number;
  color?: string;
};

export default function MukProgressBar({progress, color}: Props) {
  const {colors} = useTheme();

  return <ProgressBar progress={progress} color={color} style={{height: responsiveHeight(4), borderRadius: 100, width: '100%', backgroundColor: colors.backdrop}} />;
}
