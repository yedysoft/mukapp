import {Switch, useTheme} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';

type Props = {
  style?: StyleProp<ViewStyle>;
  value?: boolean;
  onValueChange?: () => void;
  disabled?: boolean;
};

export default function MukSwitch({disabled, style, value, onValueChange}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <Switch disabled={disabled} style={style} value={value} onValueChange={onValueChange} color={colors.primary} />
  );
}
