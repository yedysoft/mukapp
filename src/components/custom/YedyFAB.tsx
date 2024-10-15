import {responsiveWidth, shadowStyle} from '../../utils/util';
import {StyleProp, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {ModalScreenProps, TooltipScreenProps, YedyIconName} from '../../types';
import {ReactNode} from 'react';
import YedyIconButton from './YedyIconButton';
import useTheme from '../../hooks/useTheme';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon: YedyIconName;
  scale?: number;
  visible?: boolean;
  tooltip?: ({positions, visible, changeVisible, data}: TooltipScreenProps) => ReactNode;
  modal?: ({visible, changeVisible, data}: ModalScreenProps) => ReactNode;
  tooltipOrModalData?: any;
};

export default observer(({onPress, style, icon, scale = 1, visible, tooltip, modal, tooltipOrModalData}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: visible ? undefined : 'none',
        position: 'absolute',
        right: responsiveWidth(16),
      }}
    >
      <YedyIconButton
        icon={icon}
        color={colors.dark}
        scale={scale}
        style={[
          {
            backgroundColor: colors.primary,
            borderRadius: 100,
          },
          shadowStyle(colors.primary),
          style,
        ]}
        onPress={onPress}
        tooltip={tooltip}
        modal={modal}
        tooltipOrModalData={tooltipOrModalData}
      />
    </View>
  );
});
