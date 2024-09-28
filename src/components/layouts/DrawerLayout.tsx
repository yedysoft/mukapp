import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ReactNode} from 'react';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';

type Props = {
  children?: ReactNode;
};

export default ({children}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: responsiveWidth(8),
      }}
    >
      {children}
    </SafeAreaView>
  );
};
