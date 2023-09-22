import {useTheme} from 'react-native-paper';
import {Image, ImageSourcePropType, ImageStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  source: ImageSourcePropType;
  style?: ImageStyle;
  scale?: number;
};

export default function MukImage({source, style, scale}: Props) {
  const theme = useTheme();

  return (
    <Image
      source={source}
      resizeMode={'contain'}
      style={[
        {
          backgroundColor: 'transparent',
          borderRadius: responsiveWidth(16),
          width: responsiveWidth(scale ? 64 * scale : 64),
          height: responsiveWidth(scale ? 64 * scale : 64),
          aspectRatio: 1,
        },
        style,
      ]}
    />
  );
}
