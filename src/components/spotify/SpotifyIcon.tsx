import {GestureResponderEvent, Image, ImageStyle, LayoutChangeEvent, Pressable, Text} from 'react-native';
import {memo, useMemo, useState} from 'react';
import {responsiveSize} from '../../utils/util';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {services} from '../../services';

type Props = {
  color?: 'green' | 'white' | 'black';
  scale?: number;
  style?: ImageStyle;
  onPress?: () => void;
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
    onPress && onPress();
  };

  return (
    <Pressable disabled={!onPress} onPress={handleOnPress} style={{flexDirection: 'row', alignItems: 'center'}}>
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
      {!noText && (
        <Text
          style={{color: color === 'green' ? colors.secondary : color, fontSize: responsiveSize(14), fontWeight: '500'}}
        >
          {spotifyText ?? 'Play on Spotify'}
        </Text>
      )}
    </Pressable>
  );
};

const SpotifyIcon = memo(SpotifyIconComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default SpotifyIcon;
