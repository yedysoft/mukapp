import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../types';

export default () => {
  const {colors} = useTheme<MukTheme>();
  const {media, room} = useStores();
  const {api} = useServices();
  const [result, setResult] = useState<{isLive: boolean; dominantColor: string; isColorLight: boolean}>({
    isLive: room.isLive,
    dominantColor: media.getPlayingTrack.dominantColor ?? colors.background,
    isColorLight: api.helper.isColorLight(media.getPlayingTrack.dominantColor ?? colors.background),
  });

  useEffect(() => {
    const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
    const isColorLight = api.helper.isColorLight(dominantColor);
    if (
      result.isLive !== room.isLive ||
      result.dominantColor !== dominantColor ||
      result.isColorLight !== isColorLight
    ) {
      setResult({isLive: room.isLive, dominantColor, isColorLight});
    }
  }, [media.getPlayingTrack.dominantColor, room.isLive, colors.background]);

  return result;
};
