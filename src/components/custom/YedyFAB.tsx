import {responsiveWidth, shadowStyle} from '../../utils/util';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {ModalScreenProps, TooltipScreenProps, YedyIconName} from '../../types';
import {ReactNode} from 'react';
import YedyIconButton from './YedyIconButton';
import {useTheme} from '../../hooks';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconViewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  icon: YedyIconName;
  color?: string;
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
    iconViewStyle,
    iconStyle,
    icon,
    color,
    scale = 0.5,
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
        color={color ?? colors.dark}
        scale={scale}
        onPress={onPress}
        tooltip={tooltip}
        modal={modal}
        tooltipOrModalData={tooltipOrModalData}
        visible={visible}
        directionH={directionH}
        directionV={directionV}
        iconStyle={iconStyle}
        iconViewStyle={iconViewStyle}
        style={[
          {
            position: 'absolute',
            zIndex: 1400,
            backgroundColor: colors.primary,
            width: responsiveWidth(scale * 100),
            aspectRatio: 1,
          },
          shadowStyle(colors.primary),
          style,
        ]}
      />
    );
  },
);
