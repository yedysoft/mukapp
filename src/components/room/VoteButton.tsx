import {YedyBadge, YedyImage} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {StyleProp, View, ViewStyle} from 'react-native';

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
      <YedyBadge
        badge={badge}
        style={{
          right: responsiveWidth(-8),
          top: responsiveWidth(9),
        }}
      />
      <YedyImage
        scale={0.5}
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
