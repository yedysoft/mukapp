import {Image, ImageStyle} from 'react-native';
import {responsiveScale} from '../../utils/util';

type Props = {
  scale?: number;
  imageStyle?: ImageStyle;
};

export default ({scale = 1.2, imageStyle}: Props) => {
  const width = responsiveScale(scale);

  return (
    <Image
      source={require('../../../assets/logo.png')}
      resizeMode={'contain'}
      style={[
        {
          width: width,
          height: width / (562 / 300), // width / height
        },
        imageStyle,
      ]}
    />
  );
};
