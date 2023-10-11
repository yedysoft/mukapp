import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useState} from 'react';
import {ILogin} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize} from '../../utils/Responsive';
import {useStores} from '../../stores';

export const AuthLoginForm = observer(() => {
  const {colors} = useTheme();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123'});
  const {api, t} = useServices();
  const {loading} = useStores();

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <View style={{gap: responsiveHeight(64)}}>
      <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>{t.do('auth.title')}</Text>
      <View style={{gap: responsiveHeight(16)}}>
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
      </View>
      <MukButton loading={loading.getLogin} label={t.do('auth.login')} onPress={() => api.auth.login(form)} />
    </View>
  );
});
