import {Image, ImageStyle} from 'react-native';
import {responsiveWidth} from '../../utils/util';

type Props = {
  imageStyle?: ImageStyle;
};

export default ({imageStyle}: Props) => {
  return (
    <Image
      source={require('../../../assets/logo.png')}
      resizeMode={'contain'}
      style={[
        {
          width: responsiveWidth(100),
          aspectRatio: 562 / 300, //Logonun width ve height değerleri
        },
        imageStyle,
      ]}
    />
  );
};
