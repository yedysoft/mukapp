import {useTheme} from 'react-native-paper';
import {Image, ImageSourcePropType, ImageStyle} from 'react-native';
import {responsiveScale} from '../../utils/Responsive';
import {MukTheme} from '../../types';

type Props = {
  source: ImageSourcePropType;
  style?: ImageStyle;
  scale?: number;
};

export default function MukImage({source, style, scale}: Props) {
  const {colors} = useTheme<MukTheme>();

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
}
