import {Text, useTheme} from 'react-native-paper';
import AuthLayout from '../../components/layouts/AuthLayout';
import MukButton from '../../components/custom/MukButton';
import {observer} from 'mobx-react';
import {useServices} from '../../services';
import MukTextInput from '../../components/custom/MukTextInput';
import {useState} from 'react';
import {ILogin} from '../../types/auth';

export const LoginScreen = observer(() => {
  const {colors} = useTheme();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123'});
  const {api, t} = useServices();

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };
  return (
    <AuthLayout>
      <Text>{t.do('auth.title')}</Text>
      <MukTextInput name={'name'} label={t.do('auth.user')} value={form.name} onChange={handleOnChange} validate={[value => value.length > 0]} validationMessage={['Boş bırakmayın']} />
      <MukTextInput
        name={'pass'}
        label={t.do('auth.pass')}
        value={form.pass}
        hideText={true}
        onChange={handleOnChange}
        validate={[value => value.length > 0, value => value.length >= 3 && value.length <= 32]}
        validationMessage={['Boş bırakmayın', 'Şifre 3 ile 32 karakter arasında olmalıdır.']}
      />
      <MukButton label={t.do('auth.login')} onPress={() => api.auth.login(form)} />
    </AuthLayout>
  );
});
