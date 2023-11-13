import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useState} from 'react';
import {ILogin} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {stores, useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export const AuthLoginForm = observer(() => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123', expoToken: stores.ui.getExpoToken});
  const {api, t} = useServices();
  const {loading} = useStores();

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}>
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>Giriş Yap</Text>
        <View style={{}}>
          <MukTextInput
            name={'name'}
            label={t.do('auth.user')}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
          />
          <MukTextInput
            name={'pass'}
            label={t.do('auth.pass')}
            value={form.pass}
            hideText={true}
            onChange={handleOnChange}
            preValidate={'required'}
            validate={[value => value.length >= 3 && value.length <= 32]}
            validationMessage={['Şifre 3 ile 32 karakter arasında olmalıdır.']}
          />
          <MukButton buttonStyle={{backgroundColor: 'transparent', padding: 0, alignSelf: 'flex-end', marginTop: responsiveWidth(8)}} textStyle={{color: colors.outlineVariant, fontWeight: '400', fontSize: responsiveSize(14)}} loading={loading.getLogin} label={'Şifremi Unuttum'} onPress={() => navigation.navigate('Forgot')} />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton buttonStyle={{backgroundColor: 'transparent', padding: 0}} textStyle={{color: colors.outlineVariant, fontWeight: '400'}} loading={loading.getLogin} label={'Hesabım Yok'} onPress={() => navigation.navigate('Register')} />
        <MukButton buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}} loading={loading.getLogin} label={'Giriş'} onPress={() => api.auth.login(form)} />
      </View>
    </SafeAreaView>
  );
});
