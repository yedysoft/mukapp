import {FAB, MD3Theme, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const MukFAB = observer(({onPress, style}: Props) => {
  const theme = useTheme();
  const styles = makeStyles({theme});
  const {room} = useStores();

  return (
    <FAB
      icon="plus"
      color={theme.colors.background}
      customSize={responsiveSize(64)}
      style={[
        {
          position: 'absolute',
          backgroundColor: theme.colors.primary,
          bottom: room.isLive ? responsiveWidth(110) : responsiveWidth(16),
          right: responsiveWidth(16),
          borderRadius: 100,
        },
        styles.shadow,
        style,
      ]}
      onPress={onPress}
    />
  );
});

type SProps = {
  theme: MD3Theme;
};

const makeStyles = ({theme}: SProps) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 0,
    },
  });

export default MukFAB;
