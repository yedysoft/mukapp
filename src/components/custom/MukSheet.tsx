import {StyleProp, View, ViewStyle} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback, useMemo} from 'react';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {observer} from 'mobx-react';

type Props = {
  sheetRef: React.RefObject<BottomSheetMethods>;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  snaps: string[];
  containerStyle?: StyleProp<ViewStyle>;
};

const MukSheet = observer(({sheetRef, children, contentStyle, snaps, containerStyle}: Props) => {
  const {colors} = useTheme();
  const snapPoints = useMemo(() => snaps, []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      containerStyle={containerStyle}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      handleIndicatorStyle={{backgroundColor: colors.primary, width: responsiveWidth(80)}}
      backgroundStyle={{backgroundColor: colors.background}}
    >
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: responsiveWidth(20),
            paddingVertical: responsiveHeight(8),
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </BottomSheet>
  );
});

export default MukSheet;
