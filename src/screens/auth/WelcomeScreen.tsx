import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import MukButton from '../../components/custom/MukButton';
import MukLogo from '../../components/custom/MukLogo';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import {useServices} from '../../services';

export const WelcomeScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {t} = useServices();
  const navigation = useNavigation<AuthStackNavProp>();

  return (
    <AuthLayout style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(64)}}>
      <MukLogo imageStyle={{width: responsiveWidth(120), height: responsiveWidth(120)}} />
      <View style={{flexDirection: 'column', gap: responsiveWidth(16), width: responsiveWidth(220)}}>
        <MukButton
          textStyle={{fontWeight: '600'}}
          label={t.do('auth.login.title')}
          onPress={() => navigation.navigate('Login')}
        />
        <MukButton
          buttonStyle={{backgroundColor: colors.shadow}}
          textStyle={{color: colors.secondary, fontWeight: '600'}}
          label={t.do('auth.register.title')}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </AuthLayout>
  );
});
