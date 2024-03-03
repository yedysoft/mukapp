import {Image, ImageSourcePropType, ImageStyle, View} from 'react-native';
import {responsiveScale} from '../../utils/util';

type Props = {
  source?: ImageSourcePropType;
  style?: ImageStyle;
  scale?: number;
};

export default function MukImage({source, style, scale}: Props) {
  if (source) {
    return (
      <Image
        source={source}
        resizeMode={'contain'}
        style={[
          {
            backgroundColor: 'transparent',
            borderRadius: 16,
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
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
            borderRadius: 16,
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
          },
          style,
        ]}
      />
    );
  }
}
