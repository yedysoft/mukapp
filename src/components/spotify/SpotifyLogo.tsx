import {Image} from 'react-native';
import {useRef, useState} from 'react';

type Props = {
  color?: 'green' | 'white' | 'black';
};

const MIN_WIDTH = 70;

export default function SpotifyLogo({color = 'green'}: Props) {
  const logos = {
    green: require('../../../assets/spotify/logo_green.png'),
    black: require('../../../assets/spotify/logo_black.png'),
    white: require('../../../assets/spotify/logo_white.png'),
  };

  const ref = useRef<Image>(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const onLayout = () => {
    if (ref.current) {
      ref.current.measure((_x, _y, width, height) => {
        setDimensions({width: width, height: height});
      });
    }
  };

  return (
    <Image
      ref={ref}
      source={logos[color]}
      resizeMode={'contain'}
      style={{
        backgroundColor: 'transparent',
        minWidth: MIN_WIDTH,
        width: 70,
        height: 940 / (3432 / 70),
        margin: dimensions.height / 2,
      }}
      onLayout={onLayout}
    />
  );
}
