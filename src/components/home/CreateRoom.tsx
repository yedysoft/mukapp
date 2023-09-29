import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';

export default function CreateRoom() {
  const sheetRef = useRef<BottomSheet>(null);
  const {api} = useServices();

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet sheetRef={sheetRef}>
        <MukButton label={'Oda Oluştur'} onPress={() => api.room.openRoom()} />
      </MukSheet>
    </>
  );
}
