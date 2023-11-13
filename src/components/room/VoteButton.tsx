import {useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/Responsive';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import MukBadge from '../custom/MukBadge';

type Props = {
  onPress?: () => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

export default function VoteButton({onPress, badge, style, isLoading}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          left: responsiveWidth(24),
          bottom: responsiveWidth(24),
        }}
      />
      <MukImage
        scale={0.6}
        source={!isLoading ? require('../../../assets/vote/vote-filled.png') : require('../../../assets/loader.gif')}
      />
      {/*<MukMask
        progress={'100%'}
        mask={<MukImage scale={.6} source={require('../../../assets/vote/vote-filled.png')} />}
        masked={<MukImage scale={.6} source={require('../../../assets/vote/vote-outlined.png')} />}
      />*/}
    </TouchableOpacity>
  );
}
