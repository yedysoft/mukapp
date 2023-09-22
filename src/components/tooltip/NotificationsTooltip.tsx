import {useTheme} from 'react-native-paper';
import {responsiveWidth, screenHeight, screenWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {Pressable, View} from 'react-native';
import {useState} from 'react';
import {observer} from 'mobx-react';
import NotificationList from '../tooltip/NotificationList';
import {NavButton} from '../header/NavButton';

export const NotificationsTooltip = observer(() => {
  const {colors} = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Pressable
          onPress={() => setOpen(false)}
          style={{position: 'absolute', top: 0, left: 0, height: screenHeight, width: screenWidth, backgroundColor: colors.background, opacity: 0.5}}
        />
      )}
      <NavButton>
        <MukIconButton icon={'bell-outline'} scale={0.4} onPress={() => setOpen(!open)} />
      </NavButton>
      <View
        style={{
          display: open ? undefined : 'none',
          position: 'absolute',
          top: responsiveWidth(136),
          right: 0,
          borderRadius: 16,
          backgroundColor: colors.background,
          borderWidth: 0.5,
          borderColor: colors.primary,
          width: screenWidth / 2,
          height: responsiveWidth(320),
        }}
      >
        <View
          style={{
            position: 'relative',
            top: responsiveWidth(-9),
            right: responsiveWidth(21),
            borderTopLeftRadius: 4,
            alignSelf: 'flex-end',
            backgroundColor: colors.background,
            width: responsiveWidth(16),
            aspectRatio: 1,
            transform: [{rotateZ: '45deg'}],
            borderColor: colors.primary,
            borderTopWidth: 0.5,
            borderLeftWidth: 0.5,
          }}
        />
        <NotificationList />
      </View>
    </>
  );
});
