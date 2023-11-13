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

export const AuthForgotForm = observer(() => {
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
        <Text style={{fontSize: responsiveSize(32), fontWeight: '300'}}>Şifremi Sıfırla</Text>
        <MukTextInput
          name={'email'}
          label={'Email'}
          value={form.name}
          onChange={handleOnChange}
          preValidate={'required'}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <MukButton buttonStyle={{backgroundColor: colors.backdrop, paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
                   textStyle={{color: colors.secondary, fontWeight: '400'}} loading={loading.getLogin} label={'Geri'}
                   onPress={() => navigation.navigate('Login')}/>
        <MukButton buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}} loading={loading.getLogin} label={'Sıfırla'}
                   onPress={() => console.log('sifreSifirla')}/>
      </View>
    </SafeAreaView>
  );
});
