import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import PlayingTrack from '../room/PlayingTrack';
import {useStores} from '../../stores';
import {MukTheme} from '../../types';
import {responsiveHeight} from '../../utils/util';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const MainLayout = observer(({children, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {room} = useStores();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(90) : 0}
      style={{flex: 1}}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        {children}
        {room.isLive ? <PlayingTrack compact={true} /> : null}
      </View>
    </KeyboardAvoidingView>
  );
});
