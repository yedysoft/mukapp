import YedyLoader from './YedyLoader';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../../utils/util';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export default ({style}: Props) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          margin: responsiveWidth(16),
        },
        style,
      ]}
    >
      <YedyLoader loading={true} scale={1.5} />
    </View>
  );
};
