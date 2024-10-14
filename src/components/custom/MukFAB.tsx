import {FAB, useTheme} from 'react-native-paper';
import {responsiveScale, responsiveWidth} from '../../utils/util';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import {ModalScreenProps, MukColors, MukTheme, Positions, TooltipScreenProps} from '../../types';
import {ReactNode, useRef, useState} from 'react';
import defaults from '../../utils/defaults';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  scale?: number;
  tooltip?: ({positions, visible, changeVisible, data}: TooltipScreenProps) => ReactNode;
  modal?: ({visible, changeVisible, data}: ModalScreenProps) => ReactNode;
  tooltipOrModalData?: any;
};

const MukFAB = observer(({onPress, style, icon, scale = 1, tooltip, modal, tooltipOrModalData}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const {room} = useStores();

  // Tooltip için gerekenler
  const ref = useRef<View>(null);
  const [positions, setPositions] = useState<Positions>(defaults.positions);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const tooltipChangeVisible = (open: boolean) => {
    setTooltipVisible(open);
  };

  const modalChangeVisible = (open: boolean) => {
    setModalVisible(open);
  };

  const handleOnLayout = () => {
    if (tooltip && ref.current) {
      ref.current.measure((_x, _y, width, height, pageX, pageY) => {
        if (
          width &&
          height &&
          pageX &&
          pageY &&
          (positions.width !== width ||
            positions.height !== height ||
            positions.pageX !== pageX ||
            positions.pageY !== pageY)
        ) {
          const bottom = pageY + height;
          const right = pageX + width;
          setPositions({width, height, pageX, pageY, bottom, right});
        }
      });
    }
  };

  const handleOnPress = () => {
    handleOnLayout();
    tooltip && setTooltipVisible(!tooltipVisible);
    modal && modalChangeVisible(!modalVisible);
    onPress && onPress();
  };

  return (
    <View
      ref={ref}
      onLayout={handleOnLayout}
      style={{
        position: 'absolute',
        bottom: responsiveWidth(room.isLive ? 128 : 16),
        right: responsiveWidth(16),
      }}
    >
      <FAB
        icon={icon ?? 'plus'}
        color={colors.dark}
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
      {tooltip &&
        tooltip({
          positions: positions,
          visible: tooltipVisible,
          changeVisible: tooltipChangeVisible,
          data: tooltipOrModalData,
        })}
      {modal && modal({visible: modalVisible, changeVisible: modalChangeVisible, data: tooltipOrModalData})}
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
