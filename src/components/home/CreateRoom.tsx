import {useTheme} from 'react-native-paper';
import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';

export default function CreateRoom() {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheet>(null);

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet sheetRef={sheetRef}>
        <MukButton label={'Oda Oluştur'} onPress={() => console.log('hadi')} />
      </MukSheet>
    </>
  );
}
