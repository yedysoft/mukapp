import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
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
import {responsiveHeight, screenWidth} from '../../utils/util';
import PlayingTrack from '../room/PlayingTrack';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {room} = useStores();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={responsiveHeight(140)}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[{flex: 1, flexDirection: 'column', width: screenWidth, backgroundColor: colors.background}, style]}
        >
          {children}
          {room.isLive ? <PlayingTrack compact={true} /> : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});
