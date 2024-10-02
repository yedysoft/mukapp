import {Image, ImageStyle, LayoutChangeEvent, Platform, Pressable, Text} from 'react-native';
import {memo, useEffect, useMemo, useState} from 'react';
import {responsiveSize} from '../../utils/util';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {services, useServices} from '../../services';

type Props = {
  color?: 'green' | 'white' | 'black';
  scale?: number;
  style?: ImageStyle;
  onPress?: (e: any) => void;
  spotifyText?: string;
  noText?: boolean;
};

const MIN_WIDTH = 21;
const icons = {
  green: require('../../../assets/spotify/icon_green.png'),
  black: require('../../../assets/spotify/icon_black.png'),
  white: require('../../../assets/spotify/icon_white.png'),
};

const SpotifyIconComp = ({color = 'green', scale, style, onPress, spotifyText, noText}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const WIDTH = useMemo(() => (scale ? 21 * scale : 21), [scale]);
  const [height, setHeight] = useState(0);
  const [hasSpotify, setHasSpotify] = useState(false);

  useEffect(() => {
    api.helper.canOpenURL('spotify://').then(r => setHasSpotify(r));
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = Math.ceil(event.nativeEvent.layout.height);
    if (Math.abs(newHeight - height) > 1) {
      console.log(newHeight, height);
      setHeight(newHeight);
    }
  };

  const getSpotify = () => {
    api.helper.openURL(Platform.OS === 'ios' ? 'https://spotify.link/h5TbcGLLkhb' : 'https://spotify.link/T1vKH6Kr9ib');
  };

  return (
    <Pressable onPress={hasSpotify ? onPress : getSpotify} style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={icons[color]}
        resizeMode={'contain'}
        style={[
          {
            backgroundColor: 'transparent',
            minWidth: MIN_WIDTH,
            width: WIDTH,
            height: 940 / (939 / WIDTH),
            margin: height / 2,
          },
          style,
        ]}
        onLayout={onLayout}
      />
      {noText ? undefined : (
        <Text
          style={{color: color === 'green' ? colors.secondary : color, fontSize: responsiveSize(14), fontWeight: '500'}}
        >
          {hasSpotify ? spotifyText ?? 'Play on Spotify' : 'Get Spotify Free'}
        </Text>
      )}
    </Pressable>
  );
};

const SpotifyIcon = memo(SpotifyIconComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default SpotifyIcon;
