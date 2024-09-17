import {Image, ImageSourcePropType, ImageStyle, View} from 'react-native';
import {responsiveScale} from '../../utils/util';

type Props = {
  source?: ImageSourcePropType;
  style?: ImageStyle;
  scale?: number;
  radius?: boolean;
};

export default function MukImage({source, style, scale, radius = true}: Props) {
  if (source) {
    return (
      <Image
        source={source}
        resizeMode={'contain'}
        style={[
          {
            backgroundColor: 'transparent',
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
            borderRadius: radius ? 16 : 2
          },
          style,
        ]}
      />
    );
  } else {
    return (
      <View
        style={[
          {
            backgroundColor: 'transparent',
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
            borderRadius: radius ? 16 : 2
          },
          style,
        ]}
      />
    );
  }
}
