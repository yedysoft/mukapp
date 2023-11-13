import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useState} from 'react';
import {ILogin} from '../../types/auth';
import {useServices} from '../../services';
import {ScrollView, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {stores, useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export const AuthRegisterForm = observer(() => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [form, setForm] = useState<ILogin>({name: 'admin', pass: '123', expoToken: stores.ui.getExpoToken});
  const {api, t} = useServices();
  const {loading} = useStores();

  const [step, setStep] = useState(0)

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}>
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>Kaydol</Text>
        <View style={{}}>
          <MukTextInput
            name={'name'}
            label={'Ad'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            style={{display: step === 0 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'surname'}
            label={'Soyad'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            style={{display: step === 0 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'username'}
            label={'Kullanıcı Adı'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            style={{display: step === 0 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'email'}
            label={'Email'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            style={{display: step === 1 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'phone'}
            label={'Telefon'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            style={{display: step === 1 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'pass'}
            label={'Şifre'}
            value={form.pass}
            hideText={true}
            onChange={handleOnChange}
            preValidate={'required'}
            validate={[value => value.length >= 3 && value.length <= 32]}
            validationMessage={['Şifre 3 ile 32 karakter arasında olmalıdır.']}
            style={{display: step === 2 ? undefined : 'none'}}
          />
          <MukTextInput
            name={'repass'}
            label={'Şifre Tekrar'}
            value={form.pass}
            hideText={true}
            onChange={handleOnChange}
            preValidate={'required'}
            validate={[value => value.length >= 3 && value.length <= 32]}
            validationMessage={['Şifre 3 ile 32 karakter arasında olmalıdır.']}
            style={{display: step === 2 ? undefined : 'none'}}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton buttonStyle={{backgroundColor: step === 0 ? 'transparent' : colors.backdrop, paddingHorizontal: step === 0 ? 0 : responsiveWidth(32), paddingVertical: step === 0 ? 0 : responsiveWidth(16)}} textStyle={{color: step === 0 ? colors.outlineVariant : colors.secondary, fontWeight: '400'}} loading={loading.getLogin} label={step === 0 ? 'Hesabım Var' : 'Geri'}
                   onPress={() => step === 0 ? navigation.navigate('Login') : setStep(step-1)}/>
        <MukButton buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}} loading={loading.getLogin} label={step === 2 ? 'Kaydol' : 'İleri'} onPress={() => step === 2 ? api.auth.login(form) : setStep(step+1)}/>
      </View>
    </SafeAreaView>
  );
});
