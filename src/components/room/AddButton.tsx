import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import MukIcon from '../custom/MukIcon';
import {MukTheme} from '../../types';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export default function AddButton({onPress, style, color}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MukIcon icon={'plus'} color={color} />
    </TouchableOpacity>
  );
}
