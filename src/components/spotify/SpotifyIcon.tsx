import {Image, ImageStyle} from 'react-native';
import {useRef, useState} from "react";

type Props = {
  color?: 'green' | 'white' | 'black',
  scale?: number,
  style?: ImageStyle
};

const MIN_WIDTH = 21

export default function SpotifyIcon({color = 'green', scale, style}: Props) {
  const WIDTH = scale ? (21 * scale) : 21
  const icons = {
    green: require(`../../../assets/spotify/icon_green.png`),
    black: require(`../../../assets/spotify/icon_black.png`),
    white: require(`../../../assets/spotify/icon_white.png`)
  }

  const ref = useRef<Image>(null)
  const [dimensions, setDimensions] = useState({width: 0, height: 0})

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
      source={icons[color]}
      resizeMode={'contain'}
      style={[{
        backgroundColor: 'transparent',
        minWidth: MIN_WIDTH,
        width: WIDTH,
        height: 940 / (939 / WIDTH),
        margin: dimensions.height / 2,
      }, style]}
      onLayout={onLayout}
    />
  );
}
