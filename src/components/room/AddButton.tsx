import useTheme from '../../hooks/useTheme';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import YedyIcon from '../custom/YedyIcon';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export default function AddButton({onPress, style, color}: Props) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <YedyIcon icon={'plus'} color={color} />
    </TouchableOpacity>
  );
}
