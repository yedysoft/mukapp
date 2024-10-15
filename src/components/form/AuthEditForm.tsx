import {observer} from 'mobx-react';
import useTheme from '../../hooks/useTheme';
import YedyTextInput from '../custom/YedyTextInput';
import MukButton from '../custom/MukButton';
import React, {useRef} from 'react';
import {IEdit} from '../../types/auth';
import {useServices} from '../../services';
import {Platform, View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukForm, {MukFormRef} from '../custom/MukForm';
import MukImage from '../custom/MukImage';
import {_gender} from '../../types/enums';

export default observer(() => {
  const {colors} = useTheme();
  const {api, t} = useServices();
  const {loading, user, auth, ui} = useStores();
  const formRef = useRef<MukFormRef<IEdit>>(null);
  const {name, gender, birthday} = user.getInfo;
  const form: IEdit = {name, gender, birthday};

  const onSubmit = () => formRef.current?.validateInputs() && api.user.editInfo(formRef.current?.formData() as IEdit);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: responsiveWidth(16),
        paddingBottom: Platform.OS === 'ios' ? undefined : responsiveWidth(20),
      }}
    >
      <View
        style={{display: ui.isKeyboardVisible ? 'none' : undefined, justifyContent: 'center', alignItems: 'center'}}
      >
        <MukImage
          edit={{
            id: user.getInfo.image?.id,
            tableName: 'S_USER',
            tableId: user.getInfo.id,
            setImage: image => user.set('info', v => ({...v, image})),
          }}
          scale={2.4}
          source={
            user.getInfo.image
              ? {uri: `${user.getInfo.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
          style={{
            borderWidth: responsiveSize(4),
            borderColor: colors.primary,
            borderRadius: 100,
          }}
        />
      </View>
      <MukForm ref={formRef} onSubmit={onSubmit} data={form}>
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
      </MukForm>
      <MukButton
        buttonStyle={{paddingVertical: responsiveWidth(16)}}
        loading={loading.editInfo}
        label={t.do('auth.edit.submit')}
        onPress={onSubmit}
      />
    </View>
  );
});
