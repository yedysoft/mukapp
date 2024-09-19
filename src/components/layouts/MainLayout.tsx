import {useTheme} from 'react-native-paper';
import {ReactNode, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react';
import PlayingTrack from '../room/PlayingTrack';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {useRoute} from "@react-navigation/native";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {room, ui} = useStores();

  return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            width: ui.windowWidth,
            backgroundColor: colors.background,
            paddingTop: responsiveWidth(Platform.OS === 'ios' ? 0 : 8),
          },
          style,
        ]}
      >
        {children}
        {room.isLive ? <PlayingTrack compact={true}/> : null}
      </View>
  );
});
