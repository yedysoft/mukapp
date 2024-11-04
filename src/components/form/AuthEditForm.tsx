import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {YedyButton, YedyForm, YedyFormRef, YedyImage, YedyTextInput} from '../custom';
import React, {useRef} from 'react';
import {IEdit} from '../../types/auth';
import {useServices} from '../../services';
import {Platform, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {_gender} from '../../types/enums';

export default observer(() => {
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading, user, auth, ui} = useStores();
  const formRef = useRef<YedyFormRef<IEdit>>(null);
  const {name, gender, birthday} = user.getInfo;
  const form: IEdit = {name, gender, birthday};

  const onSubmit = () => formRef.current?.validateInputs() && api.user.editInfo(formRef.current?.formData() as IEdit);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: responsiveWidth(16),
        paddingTop: responsiveWidth(20),
        paddingBottom: Platform.OS === 'ios' ? undefined : responsiveWidth(20),
      }}
    >
      <View
        style={{display: ui.isKeyboardVisible ? 'none' : undefined, justifyContent: 'center', alignItems: 'center'}}
      >
        <YedyImage
          edit={{
            id: user.getInfo.image?.id,
            tableName: 'S_USER',
            tableId: user.getInfo.id,
            setImage: image => user.set('info', v => ({...v, image})),
          }}
          scale={2}
          source={
            user.getInfo.image
              ? {uri: `${user.getInfo.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
          style={{
            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 100,
          }}
        />
      </View>
      <YedyForm ref={formRef} onSubmit={onSubmit} data={form} style={{flex: 1}}>
        <YedyTextInput name={'name'} label={t.do('auth.register.name')} preValidate={'required'} />
        <YedyTextInput name={'telNumber'} label={t.do('auth.register.phone')} inputMode={'tel'} />
        <YedyTextInput
          name={'gender'}
          label={t.do('auth.register.gender')}
          isPicker={true}
          pickerItems={api.helper.arrayToMap<string>(_gender, 'gender')}
        />
        <YedyTextInput
          name={'birthday'}
          label={t.do('auth.register.birthday')}
          isPicker={true}
          pickerType={'date'}
          datePickerMinMax={{max: new Date().getFullYear() - 17}}
        />
      </YedyForm>
      <YedyButton loading={loading.editInfo} label={t.do('auth.edit.submit')} onPress={onSubmit} />
    </View>
  );
});
