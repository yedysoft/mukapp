import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import {StyleProp, View, ViewStyle} from 'react-native';
import MukBadge from '../custom/MukBadge';

type Props = {
  onPress?: () => void;
  badge?: number;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  disabled?: boolean;
};

export default ({onPress, badge, style, isLoading, disabled}: Props) => {
  return (
    <View style={style}>
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          right: responsiveWidth(-6),
          top: responsiveWidth(16),
          opacity: 0.8,
        }}
      />
      <MukImage
        scale={0.6}
        disabled={disabled}
        onPress={onPress}
        style={style}
        source={
          !isLoading
            ? require('../../../assets/vote/vote-filled.png')
            : disabled
            ? require('../../../assets/vote/vote-inlined.png')
            : require('../../../assets/vote/vote-outlined.png')
        }
      />
    </View>
  );
};
