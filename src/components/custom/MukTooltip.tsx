import {ReactNode} from 'react';
import {useTheme} from 'react-native-paper';
import {responsiveWidth, screenHeight, screenWidth} from '../../utils/Responsive';
import {Pressable, View} from 'react-native';
import defaults from '../../utils/defaults';
import {Positions} from '../../types';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
};

export default function MukTooltip({children, positions = defaults.positions, visible, changeVisible}: Props) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={() => changeVisible(false)}
      style={{
        display: visible ? undefined : 'none',
        position: 'absolute',
        top: -positions.pageY,
        right: 0,
        backgroundColor: colors.backdrop,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      <View
        style={{
          alignSelf: 'flex-end',
          right: screenWidth - (positions.pageX + positions.width),
          top: positions.pageY + positions.height,
          borderRadius: 16,
          backgroundColor: colors.background,
          borderWidth: 0.5,
          borderColor: colors.primary,
          width: screenWidth / 2,
          height: responsiveWidth(320),
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
