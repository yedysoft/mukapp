import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {ReactNode} from 'react';
import {observer} from 'mobx-react';
import Coin from '../user/Coin';

export const SubHeader = observer(() => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const NavButton = ({children}: {children: ReactNode}) => {
    return <View style={{width: responsiveWidth(44), aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>{children}</View>;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(24),
        paddingBottom: responsiveHeight(-16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NavButton>
        <MukIconButton icon={'chevron-left'} scale={0.7} onPress={() => navigation.goBack()} />
      </NavButton>
      <Coin />
    </SafeAreaView>
  );
});
