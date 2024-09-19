import {Image, ImageStyle, Platform, Pressable, Text, View} from 'react-native';
import {useEffect, useRef, useState} from "react";
import {responsiveSize} from "../../utils/util";
import {useTheme} from "react-native-paper";
import {MukTheme} from "../../types";
import {useServices} from "../../services";
import {spotifyOpenUrlBase} from "../../../config";

type Props = {
  color?: 'green' | 'white' | 'black',
  scale?: number,
  style?: ImageStyle,
  onPress?: (e: any) => void,
  spotifyText?: string
};

const MIN_WIDTH = 21

export default function SpotifyIcon({color = 'green', scale, style, onPress, spotifyText}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();

  const WIDTH = scale ? (21 * scale) : 21
  const icons = {
    green: require(`../../../assets/spotify/icon_green.png`),
    black: require(`../../../assets/spotify/icon_black.png`),
    white: require(`../../../assets/spotify/icon_white.png`)
  }

  const ref = useRef<Image>(null)
  const [dimensions, setDimensions] = useState({width: 0, height: 0})
  const [hasSpotify, setHasSpotify] = useState(false)

  useEffect(() => {
    api.helper.canOpenURL('spotify://').then(r => setHasSpotify(r))
  }, [])

  const onLayout = () => {
    if (ref.current && (dimensions.width === 0 || dimensions.height === 0)) {
      ref.current.measure((_x, _y, width, height) => {
        (width !== Math.ceil(dimensions.width) || height !== Math.ceil(dimensions.height)) && setDimensions({
          width: Math.ceil(width),
          height: Math.ceil(height)
        });
      });
    }
  };

  const getSpotify = () => {
    api.helper.openURL(Platform.OS === 'ios' ? 'https://spotify.link/h5TbcGLLkhb' : 'https://spotify.link/T1vKH6Kr9ib')
  }

  return (
    <Pressable onPress={hasSpotify ? onPress : getSpotify}
               style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <Text
        style={{color: color === 'green' ? colors.secondary : color, fontSize: responsiveSize(14), fontWeight: '500'}}>
        {hasSpotify ? (spotifyText ?? 'Play on Spotify') : 'Get Spotify Free'}
      </Text>
    </Pressable>
  );
}
