import {observer} from 'mobx-react';
import {useTheme} from 'react-native-paper';
import MukTextInput from '../custom/MukTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef, useState} from 'react';
import {IEdit} from '../../types/auth';
import {useServices} from '../../services';
import {Pressable, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MukTheme} from '../../types';
import MukPicker from '../custom/MukPicker';
import MukDatePicker from '../custom/MukDatePicker';
import MukImage from '../custom/MukImage';
import EditImage from '../profile/EditImage';

export const AuthEditForm = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {loading, user, auth} = useStores();
  const formRef = useRef<MukFormRef<IEdit>>(null);
  const form: IEdit = {email: '', userName: '', userPass: ''};
  const [displayPicker, setDisplayPicker] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  const onSubmit = () => formRef.current?.validateInputs() && api.auth.register(formRef.current?.formData() as IEdit);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: responsiveWidth(16),
        paddingBottom: responsiveWidth(32),
      }}
    >
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Pressable style={{borderRadius: 100}} onPress={() => setVisible(true)}>
          <MukImage
            scale={2.4}
            source={
              user.getInfo.image
                ? {uri: `${user.getInfo.image.link}?token=${auth.getEncodedAuthToken}`}
                : require('../../../assets/adaptive-icon.png')
            }
            style={{
              borderWidth: responsiveSize(4),
              borderRadius: 100,
              aspectRatio: 1,
              borderColor: colors.primary,
              backgroundColor: 'transparent',
            }}
          />
        </Pressable>
      </View>
      <MukForm ref={formRef} onSubmit={onSubmit} data={form}>
        <MukTextInput name={'name'} label={t.do('auth.register.name')} preValidate={'required'} />
        <MukTextInput name={'surname'} label={t.do('auth.register.surname')} preValidate={'required'} />
        <MukTextInput name={'userName'} label={t.do('auth.register.username')} preValidate={'required'} />
        <MukTextInput name={'email'} label={t.do('auth.register.email')} inputMode={'email'} preValidate={'required'} />
        <MukTextInput
          name={'userPass'}
          label={t.do('auth.register.password')}
          secureTextEntry={true}
          preValidate={'required'}
          validate={[value => value.length >= 8 && value.length <= 32]}
          validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.']}
        />
        <MukTextInput
          name={'repass'}
          label={t.do('auth.register.repassword')}
          secureTextEntry={true}
          preValidate={'required'}
          validate={[
            value => value.length >= 8 && value.length <= 32,
            value => value === formRef.current?.formData('userPass'),
          ]}
          validationMessage={['Şifre 8 ile 32 karakter arasında olmalıdır.', 'Şifreler eşleşmiyor.']}
        />
        <MukTextInput
          name={'telNumber'}
          label={t.do('auth.register.phone')}
          inputMode={'tel'}
          preValidate={'required'}
        />
        <MukTextInput
          name={'gender'}
          label={t.do('auth.register.gender')}
          selectionColor={colors.background}
          showKeyboard={false}
          preValidate={'required'}
          onFocus={() => setDisplayPicker('gender')}
          onBlur={() => setDisplayPicker(undefined)}
        />
        <MukTextInput
          name={'birthday'}
          label={t.do('auth.register.birthday')}
          selectionColor={colors.background}
          showKeyboard={false}
          preValidate={'required'}
          onFocus={() => setDisplayPicker('birthday')}
          onBlur={() => setDisplayPicker(undefined)}
        />
      </MukForm>
      <MukButton
        buttonStyle={{paddingHorizontal: responsiveWidth(32), paddingVertical: responsiveWidth(16)}}
        loading={loading.getRegister}
        label={t.do('auth.edit.submit')}
        onPress={onSubmit}
      />
      <View
        style={{
          display: displayPicker ? undefined : 'none',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: responsiveHeight(160),
          //marginTop: responsiveHeight(-100),
        }}
      >
        {displayPicker === 'birthday' ? (
          <MukDatePicker name={'birthday'} value={form.birthday} onValueChange={() => {}} />
        ) : (
          displayPicker === 'gender' && (
            <MukPicker<string>
              name={'gender'}
              items={[
                t.do('auth.register.genders.male'),
                t.do('auth.register.genders.female'),
                t.do('auth.register.genders.other'),
              ]}
              value={form.gender?.toString()}
              onValueChange={() => {}}
            />
          )
        )}
      </View>
      <EditImage setVisible={setVisible} isVisible={visible} />
    </View>
  );
});
