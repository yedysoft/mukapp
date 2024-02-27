import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {NavButton} from './NavButton';
import Token from '../user/Token';
import Coin from '../user/Coin';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {View} from 'react-native';

export const SubHeader = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute();
  const params: any = route.params;
  const {media, ui} = useStores();
  const {api, t} = useServices();
  const dominantColor = media.getPlayingTrack.dominantColor ?? colors.background;
  const textColor = api.helper.isColorLight(dominantColor) ? colors.dark : colors.light;

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(24),
        paddingTop: responsiveHeight(16),
        paddingBottom: responsiveHeight(-16),
        flexDirection: 'row',
        justifyContent: route.name === 'Chat' ? 'flex-start' : 'space-between',
        alignItems: 'center',
      }}
    >
      <NavButton>
        <MukIconButton
          icon={'chevron-left'}
          scale={0.7}
          onPress={() => {
            route.name === 'Settings' && ui.toggleReload();
            navigation.goBack();
          }}
          color={route.name === 'Room' ? textColor : colors.secondary}
        />
      </NavButton>
      {route.name === 'Task' ? (
        <Token style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}} />
      ) : route.name === 'Room' ? (
        <Coin
          textColor={textColor}
          style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}}
        />
      ) : route.name === 'Profile' ? (
        <MukIconButton
          style={{justifyContent: 'flex-end', marginRight: responsiveWidth(-8)}}
          icon={'edit'}
          scale={0.4}
          onPress={() => navigation.navigate('Edit')}
        />
      ) : route.name === 'Chat' ? (
        <View style={{gap: responsiveWidth(4)}}>
          <Text style={{fontSize: responsiveSize(18), color: colors.secondary}}>{params?.chat.name}</Text>
          <Text
            style={{
              fontSize: responsiveSize(14),
              color: colors.secondary,
              display: params?.chat.isTyping ? undefined : 'none',
            }}
          >
            {params?.chat.isTyping ? t.do('main.social.isTyping') : ''}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
});
