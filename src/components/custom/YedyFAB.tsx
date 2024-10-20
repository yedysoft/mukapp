import {responsiveWidth, shadowStyle} from '../../utils/util';
import {StyleProp, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {ModalScreenProps, TooltipScreenProps, YedyIconName} from '../../types';
import {ReactNode} from 'react';
import YedyIconButton from './YedyIconButton';
import {useTheme} from '../../hooks';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon: YedyIconName;
  scale?: number;
  visible?: boolean;
  directionH?: 'ltr' | 'rtl';
  directionV?: 'ttb' | 'btt';
  tooltip?: ({positions, visible, changeVisible, data}: TooltipScreenProps) => ReactNode;
  modal?: ({visible, changeVisible, data}: ModalScreenProps) => ReactNode;
  tooltipOrModalData?: any;
};

export default observer(
  ({
    onPress,
    style,
    icon,
    scale = 0.7,
    visible = true,
    directionH,
    directionV,
    tooltip,
    modal,
    tooltipOrModalData,
  }: Props) => {
    const {colors} = useTheme();

    return (
      <YedyIconButton
        icon={icon}
        color={colors.dark}
        scale={scale}
        onPress={onPress}
        tooltip={tooltip}
        modal={modal}
        tooltipOrModalData={tooltipOrModalData}
        visible={visible}
        directionH={directionH}
        directionV={directionV}
        style={[
          {
            position: 'absolute',
            zIndex: 1400,
            right: responsiveWidth(16),
            backgroundColor: colors.primary,
            width: responsiveWidth(64),
            aspectRatio: 1,
          },
          shadowStyle(colors.primary),
          style,
        ]}
      />
    );
  },
);
