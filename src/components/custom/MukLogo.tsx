import {useTheme} from 'react-native-paper';
import {Image, ImageStyle} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {MukTheme} from '../../types';

type Props = {
  imageStyle?: ImageStyle;
};

export default function MukLogo({imageStyle}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <Image
      source={require('../../../assets/logo.png')}
      resizeMode={'contain'}
      style={[
        {
          backgroundColor: 'transparent',
          width: responsiveWidth(100),
          aspectRatio: 2,
        },
        imageStyle,
      ]}
    />
  );
}
