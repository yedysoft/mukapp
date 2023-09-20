import {View} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {responsiveHeight, responsiveWidth} from "../../utils/Responsive";

type Props = {
  children: ReactNode
}

export default function MukSheet({children}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{backgroundColor: 'white'}}
    >
      <View style={{flex: 1, paddingHorizontal: responsiveWidth(20), paddingVertical: responsiveHeight(8)}}>
        {children}
      </View>
    </BottomSheet>
  );
}
