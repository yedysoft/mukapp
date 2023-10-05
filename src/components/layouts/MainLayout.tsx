import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {screenWidth} from '../../utils/Responsive';
import PlayingTrack from '../room/PlayingTrack';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={[{flex: 1, flexDirection: 'column', width: screenWidth, backgroundColor: colors.background}, style]}>
      {children}
      <PlayingTrack compact={true} />
    </View>
  );
});
