import {IconButton} from "react-native-paper";
import {responsiveSize} from "../../utils/Responsive";
import {IconSource} from "react-native-paper/lib/typescript/components/Icon";

type Props = {
  icon?: IconSource,
  color?: string,
  size?: number
}
export default function MukIconButton({icon, color, size}: Props) {
  return (
    <IconButton
      icon={icon ? icon : 'blank'}
      iconColor={color ? color : 'white'}
      size={responsiveSize(size ? size : 32)}
      onPress={() => console.log('Pressed')}
    />
  );
}
