import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

const CreateRoom = observer(() => {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const {api} = useServices();
  const {room} = useStores();

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  const createRoom = async () => {
    await api.room.createRoom();
    if (room.isLive) {
      sheetRef.current?.expand();
      navigation.navigate('Room');
    }
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet sheetRef={sheetRef}>
        <MukButton label={'Oda Oluştur'} onPress={() => createRoom()} />
      </MukSheet>
    </>
  );
});

export default CreateRoom;
