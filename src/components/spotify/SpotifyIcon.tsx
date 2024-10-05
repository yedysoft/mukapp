import {GestureResponderEvent, Image, ImageStyle, LayoutChangeEvent, Platform, Pressable} from 'react-native';
import {memo, useMemo, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {services, useServices} from '../../services';
import YedyText from '../custom/YedyText';

type Props = {
  color?: 'green' | 'white' | 'black';
  disabled?: boolean;
  scale?: number;
  style?: ImageStyle;
  onPress?: () => void;
  spotifyText?: string;
  noText?: boolean;
  id?: string;
  type?: 'track' | 'user';
};

const MIN_WIDTH = 21;
const icons = {
  green: require('../../../assets/spotify/icon_green.png'),
  black: require('../../../assets/spotify/icon_black.png'),
  white: require('../../../assets/spotify/icon_white.png'),
};

const SpotifyIconComp = ({
  color = 'green',
  disabled,
  scale,
  style,
  onPress,
  spotifyText,
  noText,
  id,
  type = 'track',
}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const WIDTH = useMemo(() => (scale ? 21 * scale : 21), [scale]);
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = Math.ceil(event.nativeEvent.layout.height);
    if (Math.abs(newHeight - height) > 1) {
      setHeight(newHeight);
    }
  };

  const handleOnPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    const url = id ? `spotify:${type}:${id}` : 'spotify://';
    api.helper
      .openURL(url)
      .catch(() =>
        api.helper.openURL(
          Platform.OS === 'ios' ? 'https://spotify.link/h5TbcGLLkhb' : 'https://spotify.link/T1vKH6Kr9ib',
        ),
      );
    onPress && onPress();
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={disabled ? undefined : handleOnPress}
      style={{
        margin: height / 2,
        gap: height / 2,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
      }}
    >
      <Image
        source={icons[color]}
        resizeMode={'contain'}
        style={[
          {
            backgroundColor: 'transparent',
            minWidth: MIN_WIDTH,
            width: WIDTH,
            height: 940 / (939 / WIDTH),
          },
          style,
        ]}
        onLayout={onLayout}
      />
      <YedyText visible={!noText} fontSize={14} style={{color: color === 'green' ? colors.secondary : color}}>
        {spotifyText ?? 'Play on Spotify'}
      </YedyText>
    </Pressable>
  );
};

const SpotifyIcon = memo(SpotifyIconComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default SpotifyIcon;
