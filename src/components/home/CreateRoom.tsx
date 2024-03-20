import MukFAB from '../../components/custom/MukFAB';
import React, {useEffect, useRef} from 'react';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukTextInput from '../custom/MukTextInput';
import {IRoomConfig} from '../../types/room';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MainStackNavProp} from '../../navigation/MainStack';
import MukBottomSheet, {MukBottomSheetRef} from '../custom/MukBottomSheet';

const CreateRoom = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {api, t} = useServices();
  const {room, user} = useStores();
  const formRef = useRef<MukFormRef<IRoomConfig>>(null);
  const sheetRef = useRef<MukBottomSheetRef>(null);
  const form: IRoomConfig | null = room.getConfig;

  useEffect(() => {
    !room.getConfig?.id && api.room.setConfig();
  }, [room.getConfig]);

  const handleOnPress = () => {
    sheetRef.current?.open();
  };

  const createRoom = async () => {
    if (formRef.current?.validateInputs()) {
      await api.room.createRoom(formRef.current?.formData() as IRoomConfig);
      if (room.isLive) {
        sheetRef.current?.close(true);
        navigation.navigate('Room');
      }
    }
  };

  return (
    <>
      {!room.isLive ? <MukFAB onPress={handleOnPress} /> : null}
      <MukBottomSheet ref={sheetRef}>
        <View style={{flexDirection: 'row', gap: responsiveWidth(16)}}>
          <MukImage scale={2} source={require('../../../assets/adaptive-icon.png')} />
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', gap: responsiveWidth(8)}}>
            <View style={{gap: responsiveWidth(4)}}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(16),
                  fontWeight: '400',
                  color: colors.secondary,
                }}
              >
                {user.getInfo.name} {user.getInfo.surname}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: responsiveSize(16),
                  fontWeight: '400',
                  color: colors.secondary,
                }}
              >
                @{user.getInfo.userName}
              </Text>
            </View>
            <MukForm ref={formRef} onSubmit={createRoom} data={form}>
              <MukTextInput
                name={'name'}
                selectionColor={colors.primary}
                label={t.do('roomConfig.name')}
                preValidate={'required'}
              />
            </MukForm>
          </View>
        </View>
        <MukButton label={t.do('roomConfig.submit')} onPress={() => createRoom()} />
      </MukBottomSheet>
    </>
  );
});

export default CreateRoom;
