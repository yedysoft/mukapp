import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import Coin from '../user/Coin';
import {NavButton} from './NavButton';

type Props = {
  type?: string;
};

export const SubHeader = observer(({type}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

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
      {type ? null : <Coin style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}} />}
    </SafeAreaView>
  );
});
