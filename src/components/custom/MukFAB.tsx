import {FAB, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import {MukColors, MukTheme} from '../../types';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
};

const MukFAB = observer(({onPress, style, icon}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const {room} = useStores();

  return (
    <FAB
      icon={icon ?? 'plus'}
      color={colors.background}
      customSize={responsiveSize(64)}
      style={[
        {
          position: 'absolute',
          backgroundColor: colors.primary,
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

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 6,
    },
  });

export default MukFAB;
