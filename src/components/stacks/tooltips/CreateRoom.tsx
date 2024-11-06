import {YedyButton, YedyForm, YedyFormRef, YedyImage, YedyText, YedyTextInput, YedyTooltip} from '../../custom';
import {Positions, YedyPopupScreenRef} from '../../../types';
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';
import {observer} from 'mobx-react';
import {View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../../utils/util';
import {useTheme} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../../navigation/MainStack';
import {IRoomConfig} from '../../../types/room';

export default observer(
  forwardRef<YedyPopupScreenRef>((_props, ref) => {
    const {colors} = useTheme();
    const navigation = useNavigation<MainStackNavProp>();
    const {api, t} = useServices();
    const {ui, room, user, auth, loading} = useStores();
    const formRef = useRef<YedyFormRef<IRoomConfig>>(null);
    const form: IRoomConfig = room.getConfig;
    const [visible, setVisible] = useState(false);
    const [positions, setPositions] = useState<Positions>();

    const changeVisible = (open: boolean) => {
      setVisible(open);
    };

    useImperativeHandle(ref, () => ({
      open: () => changeVisible(true),
      close: () => changeVisible(false),
      sendPositions: positions => setPositions(positions),
      isVisible: visible,
    }));

    useEffect(() => {
      !room.getConfig.roomId && visible && api.room.findByRoomId();
    }, [room.getConfig, visible]);

    const createRoom = async () => {
      if (formRef.current?.validateInputs()) {
        await api.room.createRoom(formRef.current?.formData() as IRoomConfig);
        if (room.isLive) {
          changeVisible(false);
          navigation.navigate('Room');
        }
      }
    };
    return (
      <YedyTooltip
        anchor={'on-top'}
        positions={positions}
        visible={visible}
        changeVisible={changeVisible}
        style={{width: ui.windowWidth, borderRadius: 0}}
      >
        <View style={{flex: 1, padding: responsiveWidth(16), flexDirection: 'row', gap: responsiveWidth(16)}}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <YedyImage
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
              scale={1.7}
              resizeMode={'cover'}
              source={
                form.image
                  ? {uri: `${form.image.link}?token=${auth.getAuthToken}`}
                  : require('../../../../assets/adaptive-icon.png')
              }
              style={{
                borderWidth: responsiveSize(1),
                borderColor: colors.outlineVariant,
              }}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column', gap: responsiveWidth(8)}}>
            <View>
              <YedyText numberOfLines={1} type={'bold'} size={13}>
                {user.getInfo.name}
              </YedyText>
              <YedyText numberOfLines={1} color={colors.outlineVariant} size={13}>
                @{user.getInfo.userName}
              </YedyText>
            </View>
            <YedyForm ref={formRef} onSubmit={createRoom} data={form}>
              <YedyTextInput
                name={'name'}
                selectionColor={colors.primary}
                label={t.do('roomConfig.name')}
                preValidate={'required'}
              />
            </YedyForm>
            <YedyButton
              buttonStyle={{paddingVertical: responsiveWidth(12)}}
              loading={loading.createRoom}
              label={t.do('roomConfig.submit')}
              onPress={createRoom}
            />
          </View>
        </View>
      </YedyTooltip>
    );
  }),
);
