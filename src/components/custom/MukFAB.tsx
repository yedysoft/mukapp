import {FAB, useTheme} from 'react-native-paper';
import {responsiveScale, responsiveWidth} from '../../utils/util';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import {MukColors, MukTheme, Positions, TooltipScreenProps} from '../../types';
import {ReactNode, useRef, useState} from 'react';
import defaults from '../../utils/defaults';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  scale?: number;
  tooltip?: ({positions, visible, changeVisible}: TooltipScreenProps) => ReactNode;
};

const MukFAB = observer(({onPress, style, icon, scale = 1, tooltip}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const {room} = useStores();

  // Tooltip için gerekenler
  const ref = useRef<View>(null);
  const [positions, setPositions] = useState<Positions>(defaults.positions);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const tooltipChangeVisible = (open: boolean) => {
    setTooltipVisible(open);
  };

  const handleOnLayout = () => {
    if (tooltip && ref.current) {
      ref.current.measure((_x, _y, width, height, pageX, pageY) => {
        setPositions({width: width, height: height, pageX: pageX, pageY: pageY});
      });
    }
  };

  const handleOnPress = () => {
    tooltip && setTooltipVisible(!tooltipVisible);
    onPress && onPress();
  };

  return (
    <View
      ref={ref}
      onLayout={handleOnLayout}
      style={{
        position: 'absolute',
        bottom: room.isLive ? responsiveWidth(120) : responsiveWidth(16),
        right: responsiveWidth(16),
      }}
    >
      <FAB
        icon={icon ?? 'plus'}
        color={colors.background}
        customSize={responsiveScale(scale)}
        style={[
          {
            backgroundColor: colors.primary,
            borderRadius: 100,
          },
          styles.shadow,
          style,
        ]}
        onPress={handleOnPress}
      />
      {tooltip && tooltip({positions: positions, visible: tooltipVisible, changeVisible: tooltipChangeVisible})}
    </View>
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
