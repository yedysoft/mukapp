import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import MukIcon from '../custom/MukIcon';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function AddButton({onPress, style}: Props) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MukIcon icon={'plus'} />
    </TouchableOpacity>
  );
}
