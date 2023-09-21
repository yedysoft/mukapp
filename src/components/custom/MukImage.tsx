import {Badge, useTheme} from 'react-native-paper';
import {Image, ImageSourcePropType, ImageStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  badge?: number;
  image: ImageSourcePropType;
  imageStyle?: ImageStyle;
  scale?: number;
};

export default function MukImage({badge, image, imageStyle, scale}: Props) {
  const theme = useTheme();

  return (
    <>
      {badge && (
        <Badge
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'white',
            width: responsiveWidth(16),
            fontWeight: 'bold',
            aspectRatio: 1,
            zIndex: 1400,
          }}
        >
          {badge}
        </Badge>
      )}
      <Image
        source={image}
        style={[
          {
            backgroundColor: theme.colors.primary,
            borderRadius: responsiveWidth(16),
            width: responsiveWidth(scale ? 64 * scale : 64),
            height: responsiveWidth(scale ? 64 * scale : 64),
            aspectRatio: 1,
          },
          imageStyle,
        ]}
      />
    </>
  );
}
