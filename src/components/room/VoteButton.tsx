import {useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/Responsive';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import MukBadge from '../custom/MukBadge';
import MukMask from '../custom/MukMask';

type Props = {
  onPress?: () => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
};

export default function VoteButton({onPress, badge, style}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          left: responsiveWidth(24),
          bottom: responsiveWidth(24)
        }}
      />
      <MukMask
        progress={'100%'}
        mask={<MukImage scale={.6} source={require('../../../assets/vote/vote-filled.png')} />}
        masked={<MukImage scale={.6} source={require('../../../assets/vote/vote-outlined.png')} />}
      />
    </TouchableOpacity>
  );
}
