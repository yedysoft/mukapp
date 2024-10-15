import {StyleProp, View, ViewStyle} from 'react-native';
import useTheme from '../../hooks/useTheme';
import MukLoader from './MukLoader';
import {responsiveWidth} from '../../utils/util';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export default function LoaderView({style}: Props) {
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
      <MukLoader loading={true} scale={0.75} />
    </View>
  );
}
