import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import MukButton from '../../components/custom/MukButton';
import MukLogo from '../../components/custom/MukLogo';
import {responsiveWidth} from '../../utils/Responsive';
import {Appearance, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {WelcomeNavProp} from '../../navigation/AuthStack';

export const WelcomeScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<WelcomeNavProp>();

  return (
    <AuthLayout style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(64)}}>
      <MukLogo imageStyle={{width: responsiveWidth(120), height: responsiveWidth(120)}} />
      <View style={{flexDirection: 'column', gap: responsiveWidth(16), width: responsiveWidth(220)}}>
        <MukButton textStyle={{fontWeight: '600'}} label={'Giriş Yap'} onPress={() => navigation.navigate('Login')} />
        <MukButton
          buttonStyle={{backgroundColor: colors.backdrop}}
          textStyle={{color: colors.secondary, fontWeight: '600'}}
          label={'Kayıt Ol'}
          onPress={() => console.log(Appearance.getColorScheme())}
        />
      </View>
    </AuthLayout>
  );
});
