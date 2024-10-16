import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import {YedyButton, YedyLogo} from '../../components/custom';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import {useTheme} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import {useServices} from '../../services';

export const WelcomeScreen = observer(() => {
  const {colors} = useTheme();
  const {t} = useServices();
  const navigation = useNavigation<AuthStackNavProp>();

  return (
    <AuthLayout style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(64)}}>
      <YedyLogo imageStyle={{width: responsiveWidth(120), height: responsiveWidth(120)}} />
      <View style={{flexDirection: 'column', gap: responsiveWidth(16), width: responsiveWidth(220)}}>
        <YedyButton label={t.do('auth.login.title')} onPress={() => navigation.navigate('Login')} />
        <YedyButton
          buttonStyle={{backgroundColor: colors.shadow}}
          label={t.do('auth.register.title')}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </AuthLayout>
  );
});
