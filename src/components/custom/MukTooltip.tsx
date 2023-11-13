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
    <View>
      <Pressable
        onPress={() => changeVisible(false)}
        style={{
          display: visible ? undefined : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          height: screenHeight,
          width: screenWidth,
          backgroundColor: colors.background,
          opacity: 0.5,
        }}
      />
      <View
        style={{
          display: visible ? undefined : 'none',
          position: 'absolute',
          top: positions.pageY + positions.height,
          left: positions.pageX,
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
        {children}
      </View>
    </View>
  );
}
