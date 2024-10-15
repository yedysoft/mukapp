import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useEffect} from 'react';
import useTheme from '../../hooks/useTheme';
import {responsiveWidth} from '../../utils/util';
import {useServices} from '../../services';
import {Pressable, View} from 'react-native';
import {useStores} from '../../stores';
import {MukMessage, YedyIconName} from '../../types';
import {observer} from 'mobx-react-lite';
import YedyText from './YedyText';
import YedyIcon from './YedyIcon';

type Props = {
  message: MukMessage;
};

export default observer(({message}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {ui} = useStores();

  const close = () => {
    ui.delMessage(message.id);
  };

  useEffect(() => {
    if (message.interval > 0) {
      api.helper.sleep(message.interval, message.id).then(close);
    }
  }, []);

  const getMessageIcon = (): YedyIconName => {
    switch (message.body.type) {
      case 'ERROR':
        return 'alert-circle';
      case 'WARNING':
        return 'alert';
      case 'INFO':
      default:
        return 'information';
    }
  };

  const getMessageTitle = () => {
    switch (message.body.type) {
      case 'ERROR':
        return 'Hata';
      case 'WARNING':
        return 'Uyarı';
      case 'INFO':
      default:
        return 'Bilgi';
    }
  };

  return (
    <Pressable style={{opacity: 0.9}} onPress={close}>
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={{
          backgroundColor: colors[message.body.type.toLowerCase() as 'info' | 'error' | 'warning'],
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          padding: responsiveWidth(8),
          flexDirection: 'row',
        }}
      >
        <YedyIcon icon={getMessageIcon()} scale={1} color={colors.text} />
        <View
          style={{
            flex: 1,
            padding: responsiveWidth(8),
            flexDirection: 'column',
            justifyContent: 'center',
            gap: responsiveWidth(4),
          }}
        >
          <YedyText fontType={'bold'} fontSize={18} style={{color: colors.text}}>
            {getMessageTitle()}
          </YedyText>
          <YedyText numberOfLines={2} fontSize={16} style={{color: colors.text}}>
            {message.body.message}
          </YedyText>
        </View>
      </Animated.View>
    </Pressable>
  );
});
