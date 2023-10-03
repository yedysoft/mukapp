import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import MukTextInput from '../custom/MukTextInput';
import {IRoomConfig} from '../../types/room';

const CreateRoom = observer(() => {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const {api, t} = useServices();
  const {room} = useStores();
  const [form, setForm] = useState<IRoomConfig | null>(room.getConfig);

  if (room.getConfig === null) {
    api.room.setConfig();
  }

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  const handleOnChange = (name: string, value: string) => {
    if (form) {
      setForm({...form, [name]: value});
    }
  };

  const createRoom = async () => {
    if (form) {
      await api.room.createRoom(form);
      if (room.isLive) {
        sheetRef.current?.expand();
        navigation.navigate('Room');
      }
    }
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet sheetRef={sheetRef}>
        <MukTextInput
          name={'name'}
          label={t.do('roomConfig.name')}
          value={form?.name}
          onChange={handleOnChange}
          preValidate={'required'}
        />
        <MukButton label={t.do('roomConfig.createRoom')} onPress={() => createRoom()} />
      </MukSheet>
    </>
  );
});

export default CreateRoom;
