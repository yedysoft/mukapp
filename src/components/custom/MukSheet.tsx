import {View} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback, useMemo} from 'react';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useTheme} from 'react-native-paper';

type Props = {
  sheetRef: React.RefObject<BottomSheetMethods>;
  children: ReactNode;
};

export default function MukSheet({sheetRef, children}: Props) {
  const {colors} = useTheme();
  const snapPoints = useMemo(() => ['75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      handleIndicatorStyle={{backgroundColor: colors.primary, width: responsiveWidth(80)}}
      backgroundStyle={{backgroundColor: colors.background}}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(20),
          paddingVertical: responsiveHeight(8),
        }}
      >
        {children}
      </View>
    </BottomSheet>
  );
}
