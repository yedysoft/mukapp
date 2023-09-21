import {useTheme} from 'react-native-paper';
import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

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
        <></>
      </MukSheet>
    </>
  );
}
