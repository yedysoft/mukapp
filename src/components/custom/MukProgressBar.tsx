import {ProgressBar, useTheme} from 'react-native-paper';
import {responsiveHeight} from '../../utils/Responsive';

type Props = {
  progress?: number;
};

export default function MukProgressBar({progress}: Props) {
  const {colors} = useTheme();

  return <ProgressBar progress={progress} color={colors.primary} style={{height: responsiveHeight(4), borderRadius: 100, width: '100%', backgroundColor: colors.backdrop}} />;
}
