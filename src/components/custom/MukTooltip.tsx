import {ReactNode} from 'react';
import {MD3Theme, useTheme} from 'react-native-paper';
import {responsiveWidth, screenHeight, screenWidth} from '../../utils/Responsive';
import {Pressable, StyleSheet, View} from 'react-native';
import defaults from '../../utils/defaults';
import {Positions} from '../../types';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
};

export default function MukTooltip({children, positions = defaults.positions, visible, changeVisible}: Props) {
  const theme = useTheme();
  const styles = makeStyles({theme});

  return (
    <Pressable
      onPress={() => changeVisible(false)}
      style={{
        display: visible ? undefined : 'none',
        position: 'absolute',
        top: -positions.pageY,
        right: -responsiveWidth(8),
        backgroundColor: theme.colors.backdrop,
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
            backgroundColor: theme.colors.background,
            borderWidth: 0.5,
            borderColor: theme.colors.backdrop,
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
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  });
