import MukTooltip from '../custom/YedyTooltip';
import {TooltipScreenProps} from '../../types';
import React, {useEffect, useRef} from 'react';
import {useServices} from '../../services';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import {View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';
import useTheme from '../../hooks/useTheme';
import MukForm, {MukFormRef} from '../custom/MukForm';
import YedyTextInput from '../custom/YedyTextInput';
import MukButton from '../custom/MukButton';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {IRoomConfig} from '../../types/room';
import {MukBottomSheetRef} from '../custom/MukBottomSheet';
import YedyText from '../custom/YedyText';

const RoomConfigTooltip = observer(({positions, visible, changeVisible}: TooltipScreenProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {api, t} = useServices();
  const {ui, room, user, auth, loading} = useStores();
  const formRef = useRef<MukFormRef<IRoomConfig>>(null);
  const sheetRef = useRef<MukBottomSheetRef>(null);
  const form: IRoomConfig = room.getConfig;

  useEffect(() => {
    !room.getConfig.roomId && api.room.findByRoomId();
  }, [room.getConfig]);

  const createRoom = async () => {
    if (formRef.current?.validateInputs()) {
      await api.room.createRoom(formRef.current?.formData() as IRoomConfig);
      sheetRef.current?.close();
      if (room.isLive) {
        sheetRef.current?.close(true);
        navigation.navigate('Room');
      }
    }
  };
  return (
    <MukTooltip
      anchor={'on-top'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: ui.windowWidth - responsiveWidth(32)}}
    >
      <View style={{flex: 1, padding: responsiveWidth(16), flexDirection: 'row', gap: responsiveWidth(16)}}>
        <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
          <MukImage
            edit={
              form.id
                ? {
                    id: form.image?.id,
                    tableName: 'ROOM_CONFIG',
                    tableId: form.id,
                    setImage: image => room.set('config', v => ({...v, image})),
                  }
                : undefined
            }
            scale={2}
            resizeMode={'cover'}
            source={
              form.image
                ? {uri: `${form.image.link}?token=${auth.getAuthToken}`}
                : require('../../../assets/adaptive-icon.png')
            }
            style={{
              borderWidth: responsiveSize(1),
              borderColor: colors.primary,
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', gap: responsiveWidth(8)}}>
          <View>
            <YedyText numberOfLines={1} fontType={'bold'}>
              {user.getInfo.name}
            </YedyText>
            <YedyText numberOfLines={1} fontSize={12}>
              @{user.getInfo.userName}
            </YedyText>
          </View>
          <MukForm ref={formRef} onSubmit={createRoom} data={form}>
            <YedyTextInput
              name={'name'}
              selectionColor={colors.primary}
              label={t.do('roomConfig.name')}
              preValidate={'required'}
            />
          </MukForm>
          <MukButton
            buttonStyle={{paddingVertical: responsiveWidth(12)}}
            loading={loading.createRoom}
            label={t.do('roomConfig.submit')}
            onPress={createRoom}
          />
        </View>
      </View>
    </MukTooltip>
  );
});

export default (props: TooltipScreenProps) => <RoomConfigTooltip {...props} />;
