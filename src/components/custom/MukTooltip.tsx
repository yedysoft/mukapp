import {ReactNode} from 'react';
import {Portal, useTheme} from 'react-native-paper';
import {screenHeight, screenWidth} from '../../utils/util';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export default function MukTooltip({children, positions = defaults.positions, visible, changeVisible, style}: Props) {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);

  return (
    <Portal.Host>
      <Pressable
        //onPress={() => changeVisible(false)}
        style={{
          display: visible ? undefined : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: colors.backdrop,
          width: screenWidth,
          height: screenHeight,
        }}
      >
        <SafeAreaView>
          <View
            style={[
              {
                top: positions.pageY,
                borderRadius: 16,
                backgroundColor: colors.background,
                borderWidth: 0.5,
                borderColor: colors.backdrop,
              },
              styles.shadow,
              style,
            ]}
          >
            {children}
          </View>
        </SafeAreaView>
      </Pressable>
    </Portal.Host>
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
