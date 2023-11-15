import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useRef, useState} from 'react';
import {IForgot} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {ForgotNavProp} from '../../navigation/AuthStack';

export const AuthForgotForm = observer(() => {
  const navigation = useNavigation<ForgotNavProp>();
  const {colors} = useTheme<MukTheme>();
  const [form, setForm] = useState<IForgot>({name: ''});
  const {api} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef>(null);

  const handleOnChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>Şifremi Sıfırla</Text>
        <MukForm ref={formRef}>
          <MukTextInput
            name={'name'}
            label={'Email'}
            value={form.name}
            onChange={handleOnChange}
            preValidate={'required'}
            validate={[value => value.length >= 3]}
            validationMessage={['En az 3 karakter olmalıdır.']}
          />
        </MukForm>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton
          buttonStyle={{
            backgroundColor: colors.backdrop,
            paddingHorizontal: responsiveWidth(32),
            paddingVertical: responsiveWidth(16),
          }}
          textStyle={{color: colors.secondary, fontWeight: '400'}}
          disabled={loading.getForgotPass}
          label={'Geri'}
          onPress={() => navigation.navigate('Login')}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getForgotPass}
          label={'Sıfırla'}
          onPress={() => {
            if (formRef.current?.validateInputs()) {
              api.auth.forgotPass(form);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
});
