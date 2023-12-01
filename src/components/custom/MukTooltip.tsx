import {ReactNode} from 'react';
import {Portal, useTheme} from 'react-native-paper';
import {screenHeight, screenWidth} from '../../utils/util';
import {Pressable, StyleSheet, View} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    <Portal>
      <Pressable
        onPress={() => changeVisible(false)}
        style={{
          display: visible ? undefined : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'red', //colors.backdrop,
          width: screenWidth,
          height: screenHeight,
        }}
      >
        <SafeAreaView>
          <View
            style={[
              {
                //alignSelf: 'flex-end',
                //right: screenWidth - (positions.pageX + positions.width - responsiveWidth(8)),
                top: positions.pageY + 25,
                left: 0,
                borderRadius: 16,
                backgroundColor: 'blue', //colors.background,
                borderWidth: 0.5,
                borderColor: colors.backdrop,
                //width: screenWidth / 2,
                //height: responsiveWidth(320),
              },
              styles.shadow,
            ]}
          >
            {children}
          </View>
        </SafeAreaView>
      </Pressable>
    </Portal>
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
