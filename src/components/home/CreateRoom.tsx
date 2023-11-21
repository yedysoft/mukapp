import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukTextInput from '../custom/MukTextInput';
import {IRoomConfig} from '../../types/room';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import MukForm, {MukFormRef} from '../custom/MukForm';
import {MainStackNavProp} from '../../navigation/MainStack';

const CreateRoom = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const sheetRef = useRef<BottomSheet>(null);
  const formRef = useRef<MukFormRef>(null);
  const navigation = useNavigation<MainStackNavProp>();
  const {api, t} = useServices();
  const {room, user} = useStores();
  const [form, setForm] = useState<IRoomConfig | null>();

  useEffect(() => {
    if (!room.getConfig) {
      api.room.setConfig();
    } else {
      setForm(room.getConfig);
    }
  }, [room.getConfig]);

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  const handleOnChange = (name: string, value: string) => {
    if (form) {
      setForm({...form, [name]: value});
    }
  };

  const createRoom = async () => {
    if (formRef.current?.validateInputs()) {
      if (form) {
        await api.room.createRoom(form);
        if (room.isLive) {
          sheetRef.current?.close();
          navigation.navigate('Room');
        }
      }
    }
  };

  return (
    <>
      {!room.isLive ? <MukFAB onPress={handleSheet} /> : null}
      <MukSheet
        snaps={['50%']}
        sheetRef={sheetRef}
        contentStyle={{gap: responsiveWidth(16), justifyContent: 'space-between', paddingVertical: responsiveWidth(16)}}
      >
        <View style={{flexDirection: 'row', gap: responsiveWidth(16)}}>
          <MukImage scale={2} source={require('../../../assets/adaptive-icon.png')} />
          <View style={{flex: 1, flexDirection: 'column', gap: responsiveWidth(8), justifyContent: 'center'}}>
            <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400', color: colors.secondary}}>
              @{user.getInfo.userName}
            </Text>
            <MukForm ref={formRef}>
              <MukTextInput
                name={'name'}
                label={t.do('roomConfig.name')}
                value={form?.name}
                onChange={handleOnChange}
                preValidate={'required'}
              />
            </MukForm>
          </View>
        </View>
        <MukButton label={t.do('roomConfig.createRoom')} onPress={() => createRoom()} />
      </MukSheet>
    </>
  );
});

export default CreateRoom;
