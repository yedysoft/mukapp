import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useEffect} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {useServices} from '../../services';
import {Pressable, View} from 'react-native';
import {useStores} from '../../stores';
import {MukMessage, MukTheme} from '../../types';
import {observer} from 'mobx-react-lite';
import MukIcon from './MukIcon';

type Props = {
  message: MukMessage;
};

export default observer(({message}: Props) => {
  const {colors} = useTheme<MukTheme>();
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

  const getMessageIcon = () => {
    switch (message.body.type) {
      case 'ERROR':
        return <MukIcon icon="alert-circle" scale={1} color={colors.text} />;
      case 'WARNING':
        return <MukIcon icon="alert-triangle" scale={1} color={colors.text} />;
      case 'INFO':
      default:
        return <MukIcon icon="info" scale={1} color={colors.text} />;
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
    <Pressable onPress={close}>
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={{
          width: '90%',
          backgroundColor: colors[message.body.type.toLowerCase() as 'info' | 'error' | 'warning'],
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          padding: responsiveWidth(8),
          minHeight: responsiveWidth(60),
          maxHeight: responsiveWidth(96),
          flexDirection: 'row',
        }}
      >
        {getMessageIcon()}
        <View
          style={{
            flex: 1,
            padding: responsiveWidth(8),
            borderRadius: 16,
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: responsiveSize(18),
              fontWeight: 'bold',
              marginBottom: responsiveWidth(4),
            }}
          >
            {getMessageTitle()}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: colors.text,
              fontSize: responsiveSize(16),
            }}
          >
            {message.body.message}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});
