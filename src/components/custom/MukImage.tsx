import {Badge} from 'react-native-paper';
import {Image, ImageSourcePropType, ImageStyle, View} from "react-native";
import {responsiveWidth} from "../../utils/Responsive";

type Props = {
  badge?: number,
  image: ImageSourcePropType,
  imageStyle?: ImageStyle
}

export default function MukImage({badge, image, imageStyle}: Props) {
  return (
    <View>
      {badge && <Badge style={{position: 'absolute', top: 0, right: 0, color: 'white', width: responsiveWidth(16), fontWeight: 'bold', aspectRatio: 1, zIndex: 1400}}>{badge}</Badge>}
      <Image source={image} style={[{backgroundColor: 'transparent', borderRadius: responsiveWidth(16), width: responsiveWidth(64), aspectRatio: 1}, imageStyle]} />
    </View>
  );
}
