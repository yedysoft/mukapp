import YedyLoader from './YedyLoader';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useTheme} from '../../../hooks';
import {responsiveWidth} from '../../../utils/util';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export default ({style}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.backdrop,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          margin: responsiveWidth(16),
        },
        style,
      ]}
    >
      <YedyLoader loading={true} scale={0.75} />
    </View>
  );
};
