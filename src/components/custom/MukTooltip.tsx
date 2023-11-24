import {ReactNode} from 'react';
import {useTheme} from 'react-native-paper';
import {responsiveWidth, screenHeight, screenWidth} from '../../utils/util';
import {Pressable, StyleSheet, View} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
};

export default function MukTooltip({children, positions = defaults.positions, visible, changeVisible}: Props) {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);

  return (
    <Pressable
      onPress={() => changeVisible(false)}
      style={{
        display: visible ? undefined : 'none',
        position: 'absolute',
        top: -positions.pageY,
        right: -responsiveWidth(8),
        backgroundColor: colors.backdrop,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      <View
        style={[
          {
            alignSelf: 'flex-end',
            right: screenWidth - (positions.pageX + positions.width - responsiveWidth(8)),
            top: positions.pageY + positions.height,
            borderRadius: 16,
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.backdrop,
            width: screenWidth / 2,
            height: responsiveWidth(320),
          },
          styles.shadow,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
}

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  });
