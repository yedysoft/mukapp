import {observer} from "mobx-react";
import {Text, useTheme} from "react-native-paper";
import MukTextInput from "../custom/MukTextInput";
import MukButton from "../custom/MukButton";
import {useState} from "react";
import {ILogin} from "../../types/auth";
import {useServices} from "../../services";
import {View} from "react-native";
import {responsiveHeight, responsiveSize} from "../../utils/Responsive";

export const AuthLoginForm = observer(() => {
  const {colors} = useTheme();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123'});
  const {api, t} = useServices();

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <View style={{gap: responsiveHeight(64)}}>
      <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>{t.do('auth.title')}</Text>
      <View style={{gap: responsiveHeight(16)}}>
        <MukTextInput name={'name'} label={t.do('auth.user')} value={form.name} onChange={handleOnChange}
                      validate={[value => value.length > 0]} validationMessage={['Boş bırakmayın']}/>
        <MukTextInput
          name={'pass'}
          label={t.do('auth.pass')}
          value={form.pass}
          hideText={true}
          onChange={handleOnChange}
          validate={[value => value.length > 0, value => value.length >= 3 && value.length <= 32]}
          validationMessage={['Boş bırakmayın', 'Şifre 3 ile 32 karakter arasında olmalıdır.']}
        />
      </View>
      <MukButton label={t.do('auth.login')} onPress={() => api.auth.login(form)}/>
    </View>
  )
})