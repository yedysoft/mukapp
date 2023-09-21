import {Avatar, Badge} from 'react-native-paper';
import {StyleProp, View, ViewStyle} from "react-native";
import {IconSource} from "react-native-paper/lib/typescript/components/Icon";
import {responsiveSize, responsiveWidth} from "../../utils/Responsive";

type Props = {
  badge?: number,
  icon: IconSource,
  iconStyle?: StyleProp<ViewStyle>
  scale?: number
}

export default function MukIcon({badge, icon, iconStyle, scale}: Props) {
  return (
    <>
      {badge && <Badge style={{position: 'absolute', top: 0, right: 0, color: 'white', width: responsiveWidth(16), fontWeight: 'bold', aspectRatio: 1, zIndex: 1400}}>{badge}</Badge>}
      <Avatar.Icon icon={icon} size={responsiveSize(scale ? 64*scale : 64)} style={[{backgroundColor: 'transparent', marginLeft: responsiveWidth(-5)}, iconStyle]} />
    </>
  );
}
