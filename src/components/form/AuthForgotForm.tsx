import {observer} from 'mobx-react';
import {Text, useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import {useRef} from 'react';
import {IForgot} from '../../types/auth';
import {useServices} from '../../services';
import {View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import {AuthStackNavProp} from '../../navigation/AuthStack';

export const AuthForgotForm = observer(() => {
  const navigation = useNavigation<AuthStackNavProp>();
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading} = useStores();
  const formRef = useRef<MukFormRef<IForgot>>(null);
  const form: IForgot = {email: ''};

  const onSubmit = () =>
    formRef.current?.validateInputs() && api.auth.forgotPass(formRef.current?.formData() as IForgot);

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: responsiveHeight(32)}}
    >
      <View style={{gap: responsiveHeight(48)}}>
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300', color: colors.secondary}}>
          {t.do('auth.forgot.title')}
        </Text>
        <MukForm ref={formRef} onSubmit={onSubmit} data={form}>
          <MukTextInput
            name={'email'}
            label={t.do('auth.forgot.email')}
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
          label={t.do('auth.forgot.back')}
          onPress={() => navigation.navigate('Login')}
        />
        <MukButton
          buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
          loading={loading.getForgotPass}
          label={t.do('auth.forgot.submit')}
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
});
