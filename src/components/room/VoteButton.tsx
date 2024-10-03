import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import {GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import MukBadge from '../custom/MukBadge';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  disabled?: boolean;
};

export default ({onPress, badge, style, isLoading, disabled}: Props) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style}>
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          right: responsiveWidth(-8),
          bottom: responsiveWidth(24),
        }}
      />
      <MukImage
        scale={0.6}
        source={
          !isLoading
            ? require('../../../assets/vote/vote-filled.png')
            : disabled
            ? require('../../../assets/vote/vote-inlined.png')
            : require('../../../assets/vote/vote-outlined.png')
        }
      />
      {/*<MukMask
        progress={'100%'}
        mask={<MukImage scale={.6} source={require('../../../assets/vote/vote-filled.png')} />}
        masked={<MukImage scale={.6} source={require('../../../assets/vote/vote-outlined.png')} />}
      />*/}
    </TouchableOpacity>
  );
};
