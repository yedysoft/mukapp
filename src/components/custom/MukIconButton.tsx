import {IconButton} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

type Props = {
  icon?: IconSource;
  color?: string;
  scale?: number;
  onPress?: () => void;
};
export default function MukIconButton({icon, color, scale, onPress}: Props) {
  return <IconButton icon={icon ? icon : 'blank'} iconColor={color ? color : 'white'} style={{margin: 0}} size={responsiveSize(scale ? 64 * scale : 64)} onPress={onPress} />;
}
