import {Image, ImageStyle} from 'react-native';
import {responsiveScale, responsiveWidth} from '../../utils/util';

type Props = {
  scale?: number;
  imageStyle?: ImageStyle;
};

export default ({scale = 2.2, imageStyle}: Props) => {
  const width = responsiveScale(scale);

  return (
    <Image
      source={require('../../../assets/noimage-gray.png')}
      resizeMode={'contain'}
      style={[
        {
          alignSelf: 'center',
          opacity: 0.25,
          marginTop: responsiveWidth(16),
          width: width,
          height: width / (2006 / 1067), // width / height
        },
        imageStyle,
      ]}
    />
  );
};
