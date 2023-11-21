import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useRef, useState} from 'react';
import {IRegister} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';
import MukDatePicker from '../custom/MukDatePicker';

export const AuthRegisterForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef>(null);
  const [form, setForm] = useState<IRegister>({email: '', userName: '', userPass: ''});
  const [step, setStep] = useState(0);
  const [displayPicker, setDisplayPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({day: 5, month: 5, year: 1998})

  const setBirthday = (date: {day: number, month: number, year: number}) => {
    handleOnChange('birthday', `${date['day']}.${date['month']}.${date['year']}`)
  }

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>Kaydol</Text>
        <View style={{}}>
          <MukForm ref={formRef}>
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
              value={form.surname}
              onChange={handleOnChange}
              preValidate={'required'}
              style={{display: step === 0 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'birthday'}
              label={'Doğum Günü'}
              value={form.birthday}
              onChange={handleOnChange}
              selectionColor={colors.background}
              style={{display: step === 0 ? undefined : 'none'}}
              onFocus={() => {
                setDisplayPicker(true);
                setBirthday(pickerValue)
              }}
              onBlur={() => setDisplayPicker(false)}
            />
            <MukTextInput
              name={'gender'}
              label={'Cinsiyet'}
              value={form.gender?.toString()}
              onChange={handleOnChange}
              style={{display: step === 0 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'email'}
              label={'Email'}
              inputMode={'email'}
              value={form.email}
              onChange={handleOnChange}
              preValidate={'required'}
              style={{display: step === 1 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'userName'}
              label={'Kullanıcı Adı'}
              value={form.userName}
              onChange={handleOnChange}
              preValidate={'required'}
              style={{display: step === 1 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'telNumber'}
              label={'Telefon'}
              inputMode={'tel'}
              value={form.telNumber}
              onChange={handleOnChange}
              style={{display: step === 1 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'userPass'}
              label={'Şifre'}
              value={form.userPass}
              hideText={true}
              onChange={handleOnChange}
              preValidate={'required'}
              validate={[value => value.length >= 8 && value.length <= 32]}
              validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
              style={{display: step === 2 ? undefined : 'none'}}
            />
            <MukTextInput
              name={'repass'}
              label={'Şifre Tekrar'}
              hideText={true}
              preValidate={'required'}
              validate={[value => value.length >= 8 && value.length <= 32, value => value === form.userPass]}
              validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
              style={{display: step === 2 ? undefined : 'none'}}
            />
          </MukForm>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{
            backgroundColor: step === 0 ? 'transparent' : colors.backdrop,
            paddingHorizontal: step === 0 ? 0 : responsiveWidth(32),
            paddingVertical: step === 0 ? 0 : responsiveWidth(16),
          }}
          textStyle={{color: step === 0 ? colors.outlineVariant : colors.secondary, fontWeight: '400'}}
          disabled={loading.getRegister}
          label={step === 0 ? 'Hesabım Var' : 'Geri'}
          onPress={() => (step === 0 ? navigation.navigate('Login') : setStep(step - 1))}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getRegister}
          label={step === 2 ? 'Kaydol' : 'İleri'}
          onPress={() => {
            if (step === 2) {
              if (formRef.current?.validateInputs()) {
                api.auth.register(form);
              }
            } else {
              setStep(step + 1);
            }
          }}
        />
      </View>
      <View style={{display: displayPicker ? undefined : 'none', justifyContent: 'flex-start', alignItems: 'center', height: responsiveHeight(160), marginTop: responsiveHeight(-100)}}>
        <MukDatePicker value={pickerValue} onValueChange={value => setBirthday(value)} />
      </View>
    </SafeAreaView>
  );
});
